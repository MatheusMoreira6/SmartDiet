<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormDataUserRequest;
use App\Libraries\LibConversion;
use App\Models\DiarioAlimentar;
use App\Models\Dieta;
use App\Models\Genero;
use App\Models\Paciente;
use App\Models\User;
use Exception;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Pacientes extends Controller
{
    public function index()
    {
        $nutricionista = Auth::user()->nutricionista;
        $questionarios = $nutricionista->questionarios()->get()->toArray();

        $auxQuestionario = [];

        foreach ($questionarios as $questionario) {
            $auxQuestionario[] = [
                'id' => $questionario['id'],
                'descricao' => $questionario['titulo']
            ];
        }

        return $this->render('Admin/Pacientes/Pacientes', [
            'generos' => Genero::all()->toArray(),
            'questionarios' => $auxQuestionario,
            'pacientes' => $nutricionista->pacientes()->get(['id', 'nome', 'sobrenome'])->toArray(),
        ]);
    }

    public function search(string $nome = "")
    {
        $nutricionista = Auth::user()->nutricionista;

        $pacientes = Paciente::where(
            DB::raw("CONCAT(nome, ' ', sobrenome)"),
            'ilike',
            '%' . $nome . '%'
        )->where('nutricionista_id', $nutricionista->id)->get(['id', 'nome', 'sobrenome'])->toArray();

        return $this->response('admin.pacientes', [
            'pacientes' => $pacientes,
        ]);
    }

    public function show(int $id)
    {
        $paciente =  Paciente::where('id', $id)->first();

        $dadosPaciente = $paciente->with(['genero:id,descricao', 'user:id,password_temp'])->find($id)->toArray();

        $auxDadosPaciente = [
            'id' => $dadosPaciente['id'],
            'nome' => $dadosPaciente['nome'],
            'sobrenome' => $dadosPaciente['sobrenome'],
            'data_nascimento' => LibConversion::convertIsoToBr($dadosPaciente['data_nascimento']),
            'genero' => $dadosPaciente['genero']['descricao'],
            'cpf' => $dadosPaciente['cpf'],
            'telefone' => $dadosPaciente['telefone'],
            'password_temp' => $dadosPaciente['user']['password_temp'],
        ];

        $dietas = Dieta::where('paciente_id', $id)->get();

        foreach ($dietas as $dieta) {
            $refeicoes = Dietas::formattedRefeicoesDietas($dieta->id);
            $dieta['refeicoes'] = $refeicoes;
        }

        $fotosDiario = DiarioAlimentar::where('paciente_id', $id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($foto) {
                $foto->foto_url = asset('storage/' . $foto->imagem_refeicao--);
                return $foto;
            });


        $consultas = $paciente->consultas()
            ->where('finalizada', true)
            ->orderBy('data', 'desc')
            ->orderBy('id', 'desc')
            ->limit(10)->get()
            ->reverse()->toArray();

        $datas_consultas = [];

        $dados_consultas = [
            'peso' => [],
            'altura' => [],
            'imc' => [],
            'cintura' => [],
            'pescoco' => [],
            'quadril' => [],
            'percentual_gordura' => [],
            'massa_muscular' => [],
        ];

        foreach ($consultas as $consulta) {
            $datas_consultas[] = LibConversion::convertIsoToBr($consulta['data']);

            $dados_consultas['peso'][] = $consulta['peso'] ?? 0;
            $dados_consultas['altura'][] = $consulta['altura'] ?? 0;
            $dados_consultas['imc'][] = $consulta['imc'] ?? 0;
            $dados_consultas['cintura'][] = $consulta['circunferencia_cintura'] ?? 0;
            $dados_consultas['quadril'][] = $consulta['circunferencia_quadril'] ?? 0;
            $dados_consultas['pescoco'][] = $consulta['circunferencia_pescoco'] ?? 0;
            $dados_consultas['percentual_gordura'][] = $consulta['percentual_gordura'] ?? 0;
            $dados_consultas['massa_muscular'][] = $consulta['massa_muscular'] ?? 0;
        }

        $agenda_consultas = $paciente->consultas()->where('finalizada', true)->get();

        $agenda_consultas->each(function ($consulta) {
            $consulta['data'] = LibConversion::convertIsoToBr($consulta['data']);
        });

        $examesPendentes = $paciente->pedidosExames()
            ->where('data_resultado', null)
            ->with('paciente.genero')
            ->with('nutricionista.genero')
            ->with('itensPedidoExame.exame')
            ->orderBy('data_pedido', 'asc')
            ->get()->toArray();

        $auxExamesPendentes = array_map(function ($exame) {
            return [
                'id' => $exame['id'],
                'titulo_pedido' => $exame['titulo_pedido'],
                'data_pedido' => LibConversion::convertIsoToBr($exame['data_pedido']),
                'total_exames' => count($exame['itens_pedido_exame']),
                'paciente' => [
                    'nome' => $exame['paciente']['nome'] . ' ' . $exame['paciente']['sobrenome'],
                    'genero' => $exame['paciente']['genero']['descricao'],
                    'data_nascimento' => LibConversion::convertIsoToBr($exame['paciente']['data_nascimento']),
                    'cpf' => $exame['paciente']['cpf'],
                    'telefone' => $exame['paciente']['telefone'],
                ],
                'nutricionista' => [
                    'nome' => $exame['nutricionista']['nome'] . ' ' . $exame['nutricionista']['sobrenome'],
                    'genero' => $exame['nutricionista']['genero']['descricao'],
                    'data_nascimento' => LibConversion::convertIsoToBr($exame['nutricionista']['data_nascimento']),
                    'cpf' => $exame['nutricionista']['cpf'],
                    'crn' => $exame['nutricionista']['crn'],
                    'telefone' => $exame['nutricionista']['telefone'],
                    'telefone_fixo' => $exame['nutricionista']['telefone_fixo'],
                ],
                'itens_pedido_exame' => array_map(function ($item) {
                    return [
                        'id' => $item['exame']['id'],
                        'nome' => $item['exame']['nome'],
                        'unidade_medida' => $item['exame']['unidade_medida'],
                    ];
                }, $exame['itens_pedido_exame']),
            ];
        }, $examesPendentes);

        $examesFinalizados = $paciente->pedidosExames()
            ->where('data_resultado', '!=', null)
            ->with('itensPedidoExame.exame')
            ->orderBy('data_resultado', 'desc')
            ->orderBy('id', 'desc')
            ->limit(10)->get()
            ->reverse()->toArray();

        $dadosExamesFinalizados = [];
        foreach ($examesFinalizados as $exame) {
            $data = LibConversion::convertIsoToBr($exame['data_resultado']);

            foreach ($exame['itens_pedido_exame'] as $item) {
                if (!isset($dadosExamesFinalizados[$item['exame']['id']])) {
                    $dadosExamesFinalizados[$item['exame']['id']] = [
                        'id' => $item['exame']['id'],
                        'nome' => $item['exame']['nome'],
                        'unidade_medida' => $item['exame']['unidade_medida'],
                        'datas_resultados' => [],
                        'resultados' => [],
                    ];
                }

                $dadosExamesFinalizados[$item['exame']['id']]['datas_resultados'][] = $data;
                $dadosExamesFinalizados[$item['exame']['id']]['resultados'][] = $item['resultado'];
            }
        }

        $respostasQuestionarios = $paciente->respostas()->with('pergunta')->get();

        return $this->render('Admin/Pacientes/DadosPaciente', [
            'dados' => $auxDadosPaciente,
            'dietas' =>  $dietas,
            'fotos' => $fotosDiario,
            'agenda_consultas' => $agenda_consultas,
            'datas_consultas' => $datas_consultas,
            'dados_consultas' => $dados_consultas,
            'exames_pendentes' => $auxExamesPendentes,
            'exames_finalizados' => array_values($dadosExamesFinalizados),
            'respostas' => $respostasQuestionarios
        ]);
    }

    public function store(FormDataUserRequest $request)
    {
        $request->validated();

        // Gerar a senha aleatória se não fornecida
        $password = empty($request->password) ? Str::random(8) : $request->password;

        try {
            DB::transaction(function () use ($request, $password) {
                $user = User::create([
                    'nome' => $request->nome,
                    'email' => $request->email,
                    'password' => Hash::make($password),
                    'password_temp' => $password,
                    'administrador' => false,
                ]);

                Paciente::create([
                    'user_id' => $user->id,
                    'nutricionista_id' => Auth::user()->nutricionista->id,
                    'nome' => $request->nome,
                    'sobrenome' => $request->sobrenome,
                    'data_nascimento' => $request->data_nascimento,
                    'genero_id' => $request->genero_id,
                    'cpf' => $request->cpf,
                    'telefone' => $request->telefone,
                    'questionario_id' => $request->questionario_id,
                ]);
            });

            return $this->response('admin.pacientes', [
                'title' => 'Cadastro realizado com sucesso!',
                'text' => 'Senha temporária: ' . $password,
            ]);
        } catch (Exception $e) {
            return $this->responseErrors(['error' => 'Falha ao cadastrar o paciente!']);
        }
    }
}