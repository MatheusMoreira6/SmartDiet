<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Libraries\LibConversion;
use App\Mail\ConsultaAlterada;
use App\Mail\ConsultaCadastradaMail;
use App\Mail\ConsultaDesmarcada;
use App\Models\AgendaConsulta;
use App\Models\Paciente;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class Consultas extends Controller
{
    public function index()
    {
        $nutricionista = Auth::user()->nutricionista;

        $consultas = $nutricionista->consultas()
            ->with('paciente:id,nome,sobrenome,telefone')
            ->where('finalizada', false)
            ->get(['id', 'paciente_id', 'data', 'hora'])->toArray();

        $consultasFinalizadas = $nutricionista->consultas()
            ->with('paciente:id,nome,sobrenome,telefone')
            ->where('finalizada', true)
            ->get(['id', 'paciente_id', 'data', 'hora'])->toArray();

        $auxConsultas = array_map(function ($consulta) {
            return [
                'id' => $consulta['id'],
                'paciente' => $consulta['paciente']['nome'] . ' ' . $consulta['paciente']['sobrenome'],
                'telefone' => $consulta['paciente']['telefone'],
                'data' => LibConversion::convertIsoToBr($consulta['data']),
                'hora' => $consulta['hora'],
            ];
        }, $consultas);

        $auxConsultasFinalizadas = array_map(function ($consulta) {
            return [
                'id' => $consulta['id'],
                'paciente' => $consulta['paciente']['nome'] . ' ' . $consulta['paciente']['sobrenome'],
                'telefone' => $consulta['paciente']['telefone'],
                'data' => LibConversion::convertIsoToBr($consulta['data']),
                'hora' => $consulta['hora'],
            ];
        }, $consultasFinalizadas);

        $pacientes = $nutricionista->pacientes()->get(['id', 'nome', 'sobrenome'])->toArray();

        $auxPacientes = array_map(function ($paciente) {
            return [
                'id' => $paciente['id'],
                'descricao' => "{$paciente['nome']} {$paciente['sobrenome']}",
            ];
        }, $pacientes);

        $diaSemanaAtendimento = $nutricionista->diasAtendimento();

        return $this->render('Admin/Consultas/Consultas', [
            'consultas' => $auxConsultas,
            'consultas_finalizadas' => $auxConsultasFinalizadas,
            'pacientes' => $auxPacientes,
            'dias_semana' => $diaSemanaAtendimento,
        ]);
    }

    public function show(int $id)
    {
        $request = new Request(['id' => $id]);

        $regras = [
            'id' => 'required|exists:agenda_consultas,id',
        ];

        $feedback = [
            'id.required' => 'O ID é obrigatório!',
            'id.exists' => 'A consulta informada não existe!',
        ];

        $request->validate($regras, $feedback);

        try {
            $consulta = AgendaConsulta::findOrFail($id);

            $auxConsulta = [
                'id' => $consulta->id,
                'peso' => $consulta->peso,
                'altura' => $consulta->altura,
                'imc' => $consulta->imc,
                'circunferencia_cintura' => $consulta->circunferencia_cintura,
                'circunferencia_quadril' => $consulta->circunferencia_quadril,
                'circunferencia_pescoco' => $consulta->circunferencia_pescoco,
                'percentual_gordura' => $consulta->percentual_gordura,
                'massa_muscular' => $consulta->massa_muscular,
            ];

            return response()->json(['consulta' => $auxConsulta]);
        } catch (Exception $e) {
            Log::error("Erro ao visualizar a consulta: " . $e->getMessage());
            return response()->json(['errors' => ['id' => 'Falha ao visualizar a consulta!']], 422);
        }
    }

    public function datasAtendimento(int $id)
    {
        $nutricionista = Auth::user()->nutricionista;

        $diasAtendimento = $nutricionista->datasAtendimento($id);

        if (!empty($diasAtendimento)) {
            return response()->json(['datas_atendimento' => $diasAtendimento]);
        } else {
            return response()->json(['errors' => ['id' => 'Falha ao visualizar as datas de atendimento!']], 422);
        }
    }

    public function horariosAtendimento(string $date)
    {
        $nutricionista = Auth::user()->nutricionista;

        $diasAtendimento = $nutricionista->horariosAtendimento($date);

        if (!empty($diasAtendimento)) {
            return response()->json(['horarios_atendimento' => $diasAtendimento]);
        } else {
            return response()->json(['errors' => ['date' => 'Falha ao visualizar os horarios de atendimento!']], 422);
        }
    }

    public function store(Request $request)
    {

        $regras = [
            'paciente_id' => 'required|exists:pacientes,id',
            'dia_semana_id' => 'required|exists:dias_semana,id',
            'data' => 'required|date',
            'hora' => 'required|date_format:H:i',
        ];

        $feedback = [
            'paciente_id.required' => 'O campo paciente é obrigatório.',
            'paciente_id.exists' => 'O paciente informado não existe.',
            'dia_semana_id.required' => 'O campo dia da semana é obrigatório.',
            'dia_semana_id.exists' => 'O dia da semana informado não existe.',
            'data.required' => 'O campo data é obrigatório.',
            'data.date' => 'O campo data deve ser uma data válida.',
            'hora.required' => 'O campo hora é obrigatório.',
            'hora.date_format' => 'O campo hora deve ser uma hora válida.',
        ];

        $request->validate($regras, $feedback);

        $nutricionista = Auth::user()->nutricionista;

        DB::beginTransaction();

        $paciente = Paciente::where('id', $request->paciente_id)->first();
        $user = User::where('id', $paciente->user_id)->first();

        try {


            $consulta = $nutricionista->consultas()->create([
                'paciente_id' => $request->paciente_id,
                'dia_semana_id' => $request->dia_semana_id,
                'data' => $request->data,
                'hora' => $request->hora,
            ]);

            if (!$consulta) {
                DB::rollBack();
                return $this->responseErrors(['error' => 'Erro ao cadastrar a consulta.']);
            }

            Log::info('Iniciando o envio do e-mail para ' . $user->email);

            try {
                Mail::to($user->email)->send(new ConsultaCadastradaMail($consulta));
                Log::info('E-mail enviado com sucesso para ' . $user->email);
            } catch (Exception $e) {
                Log::error('Erro ao enviar e-mail: ' . $e->getMessage());
            }

            DB::commit();
            return $this->response('admin.consultas', ['title' => 'Consulta cadastrada com sucesso.']);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erro ao cadastrar a consulta:' . $e->getMessage());
            return $this->responseErrors(['error' => 'Erro ao cadastrar a consulta.']);
        }
    }

    public function update(Request $request)
    {
        $regras = [
            'id' => 'required|exists:agenda_consultas,id',
            'peso' => 'nullable|numeric',
            'altura' => 'nullable|numeric',
            'imc' => 'nullable|numeric',
            'circunferencia_cintura' => 'nullable|numeric',
            'circunferencia_quadril' => 'nullable|numeric',
            'circunferencia_pescoco' => 'nullable|numeric',
            'percentual_gordura' => 'nullable|numeric',
            'massa_muscular' => 'nullable|numeric',
        ];

        $feedback = [
            'id.required' => 'O campo id é obrigatório.',
            'id.exists' => 'A consulta informada não existe.',
            'peso.numeric' => 'O campo peso deve ser um número.',
            'altura.numeric' => 'O campo altura deve ser um número.',
            'imc.numeric' => 'O campo IMC deve ser um número.',
            'circunferencia_cintura.numeric' => 'O campo circunferência da cintura deve ser um número.',
            'circunferencia_quadril.numeric' => 'O campo circunferência do quadril deve ser um número.',
            'circunferencia_pescoco.numeric' => 'O campo circunferência do pescoço deve ser um número.',
            'percentual_gordura.numeric' => 'O campo percentual de gordura deve ser um número.',
            'massa_muscular.numeric' => 'O campo massa muscular deve ser um número.',
        ];

        $request->validate($regras, $feedback);

        DB::beginTransaction();

        try {
            $consulta = AgendaConsulta::findOrFail($request->id);

            $consulta->finalizada = true;
            $consulta->peso = $request->peso;
            $consulta->altura = $request->altura;
            $consulta->imc = $request->imc;
            $consulta->circunferencia_cintura = $request->circunferencia_cintura;
            $consulta->circunferencia_quadril = $request->circunferencia_quadril;
            $consulta->circunferencia_pescoco = $request->circunferencia_pescoco;
            $consulta->percentual_gordura = $request->percentual_gordura;
            $consulta->massa_muscular = $request->massa_muscular;

            if (!$consulta->save()) {
                DB::rollBack();
                return $this->responseErrors(['error' => 'Erro ao atualizar a consulta.']);
            }



            DB::commit();
            return $this->response('admin.consultas', ['title' => 'Consulta atualizada com sucesso.']);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erro ao atualizar a consulta:' . $e->getMessage());
            return $this->responseErrors(['error' => 'Erro ao atualizar a consulta.']);
        }
    }

    public function delete(Request $request)
    {
        $regras = [
            'id' => 'required|exists:agenda_consultas,id',
        ];

        $feedback = [
            'id.required' => 'O campo id é obrigatório.',
            'id.exists' => 'A consulta informada não existe.',
        ];

        $request->validate($regras, $feedback);

        DB::beginTransaction();

        try {
            $consulta = AgendaConsulta::findOrFail($request->id);

            $paciente = Paciente::where('id', $consulta->paciente_id)->first();
            $user = User::where('id', $paciente->user_id)->first();

            Log::info('Iniciando o envio do e-mail para ' . $user->email);

            try {
                Mail::to($user->email)->send(new ConsultaDesmarcada($consulta));
                Log::info('E-mail enviado com sucesso para ' . $user->email);
            } catch (Exception $e) {
                Log::error('Erro ao enviar e-mail: ' . $e->getMessage());
            }

            if (!$consulta->delete()) {
                DB::rollBack();
                return $this->responseErrors(['error' => 'Erro ao deletar a consulta.']);
            }



            DB::commit();
            return $this->response('admin.consultas', ['title' => 'Consulta deletada com sucesso.']);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erro ao deletar a consulta:' . $e->getMessage());
            return $this->responseErrors(['error' => 'Erro ao deletar a consulta.']);
        }
    }
}