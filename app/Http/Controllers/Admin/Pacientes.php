<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormDataUserRequest;
use App\Libraries\LibConversion;
use App\Models\AgendaConsulta;
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
        $dadosPaciente = Paciente::with(['genero:id,descricao', 'user:id,password_temp'])->find($id)->toArray();

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

        $agenda_consultas = AgendaConsulta::where('paciente_id', $id)->where('finalizada', true)->get();

        return $this->render('Admin/Pacientes/DadosPaciente', [
            'dados' => $auxDadosPaciente,
            'dietas' =>  $dietas,
            'fotos' => $fotosDiario,
            'agenda_consultas' => $agenda_consultas
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
