<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Libraries\LibConversion;
use App\Models\AgendaConsulta;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Consultas extends Controller
{
    public function index()
    {
        $paciente = Auth::user()->paciente;

        $consultas = $paciente->consultas()
            ->with('nutricionista:id,nome,sobrenome,telefone')
            ->where('finalizada', false)
            ->get(['id', 'nutricionista_id', 'data', 'hora'])->toArray();

        $auxConsultas = array_map(function ($consulta) {
            return [
                'id' => $consulta['id'],
                'nutricionista' => $consulta['nutricionista']['nome'] . ' ' . $consulta['nutricionista']['sobrenome'],
                'telefone' => $consulta['nutricionista']['telefone'],
                'data' => LibConversion::convertIsoToBr($consulta['data']),
                'hora' => $consulta['hora'],
            ];
        }, $consultas);

        $diaSemanaAtendimento = $paciente->nutricionista->diasAtendimento();

        return $this->render('User/Consultas', [
            'consultas' => $auxConsultas,
            'dias_semana' => $diaSemanaAtendimento
        ]);
    }

    public function datasAtendimento(int $id)
    {
        $nutricionista = Auth::user()->paciente->nutricionista;

        $diasAtendimento = $nutricionista->datasAtendimento($id);

        if (!empty($diasAtendimento)) {
            return response()->json(['datas_atendimento' => $diasAtendimento]);
        } else {
            return response()->json(['errors' => ['id' => 'Falha ao visualizar as datas de atendimento!']], 422);
        }
    }

    public function horariosAtendimento(string $date)
    {
        $nutricionista = Auth::user()->paciente->nutricionista;

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
            'dia_semana_id' => 'required|exists:dias_semana,id',
            'data' => 'required|date',
            'hora' => 'required|date_format:H:i',
        ];

        $feedback = [
            'dia_semana_id.required' => 'O campo dia da semana é obrigatório.',
            'dia_semana_id.exists' => 'O dia da semana informado não existe.',
            'data.required' => 'O campo data é obrigatório.',
            'data.date' => 'O campo data deve ser uma data válida.',
            'hora.required' => 'O campo hora é obrigatório.',
            'hora.date_format' => 'O campo hora deve ser uma hora válida.',
        ];

        $request->validate($regras, $feedback);

        $paciente = Auth::user()->paciente;

        DB::beginTransaction();

        try {
            $consulta = $paciente->consultas()->create([
                'nutricionista_id' => $paciente->nutricionista_id,
                'dia_semana_id' => $request->dia_semana_id,
                'data' => $request->data,
                'hora' => $request->hora,
            ]);

            if (!$consulta) {
                DB::rollBack();
                return $this->responseErrors(['error' => 'Erro ao cadastrar a consulta.']);
            }

            DB::commit();
            return $this->response('user.consultas', ['title' => 'Consulta cadastrada com sucesso.']);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erro ao cadastrar a consulta:' . $e->getMessage());
            return $this->responseErrors(['error' => 'Erro ao cadastrar a consulta.']);
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

            if (!$consulta->delete()) {
                DB::rollBack();
                return $this->responseErrors(['error' => 'Erro ao deletar a consulta.']);
            }

            DB::commit();
            return $this->response('user.consultas', ['title' => 'Consulta deletada com sucesso.']);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erro ao deletar a consulta:' . $e->getMessage());
            return $this->responseErrors(['error' => 'Erro ao deletar a consulta.']);
        }
    }
}
