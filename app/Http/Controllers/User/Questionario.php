<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Questionario as QuestionarioModel;
use App\Models\Paciente;
use App\Models\Resposta;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Questionario extends Controller
{
    public function index()
    {
        $questionario = Auth::user()->paciente->questionario;

        if ($questionario) {
            $questionario->perguntas = $questionario->perguntas;
        }

        return $this->render('User/Questionario', [
            'tinymceApiKey' => env('TINYMCE_API_KEY'),
            'questionario' => $questionario
        ]);
    }

    public function store(Request $request)
    {
        $quantidadePerguntas = Auth::user()->paciente->questionario->perguntas->count();

        $regras = [
            'id' => 'required|exists:questionarios,id',
            'respostas' => 'required|array|min:' . $quantidadePerguntas,
        ];

        $feedback = [
            'id.required' => 'O ID é obrigatório!',
            'id.exists' => 'Questionário não encontrado!',
            'respostas.required' => 'As respostas são obrigatórias',
            'respostas.array' => 'Formato inválido de respostas',
            'respostas.min' => 'É necessário responder todas as perguntas',
        ];

        $request->validate($regras, $feedback);

        foreach ($request->respostas as $resposta) {
            if (empty($resposta['resposta'])) {
                return $this->responseErrors(['error' => 'Responda todas as perguntas!']);
            }
        }

        DB::beginTransaction();

        try {
            $idPaciente = Auth::user()->paciente->id;
            $paciente = Paciente::findOrFail($idPaciente);

            foreach ($request->respostas as $resposta) {
                $auxResposta = Resposta::create([
                    'pergunta_id' => $resposta['id'],
                    'paciente_id' => $idPaciente,
                    'resposta' => $resposta['resposta'],
                ]);

                if (!$auxResposta) {
                    DB::rollBack();
                    return $this->responseErrors(['error' => 'Falha ao salvar respostas!']);
                }
            }

            $status = $paciente->update(['questionario_id' => null]);

            if (!$status) {
                DB::rollBack();
                return $this->responseErrors(['error' => 'Falha ao salvar respostas!']);
            }

            $questionario = QuestionarioModel::findOrFail($request->id);
            $questionario->perguntas = $questionario->perguntas;

            DB::commit();
            return $this->response('user.questionario', [
                'title' => 'Respostas salvas com sucesso!',
                'questionario' => $questionario
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("Erro ao responder o questionário: " . $e->getMessage());

            return $this->responseErrors(['error' => 'Falha ao salvar respostas!']);
        }
    }
}
