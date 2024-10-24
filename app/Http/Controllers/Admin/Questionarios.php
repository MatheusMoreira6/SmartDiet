<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Questionario;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Questionarios extends Controller
{
    public function index()
    {
        return $this->render('Admin/Questionarios/Questionarios');
    }

    public function cadastrar()
    {
        return $this->render('Admin/Questionarios/Cadastrar');
    }

    public function salvarQuestionario(Request $request)
    {
        $regras = [
            'titulo' => 'required|min:3|max:255',
            'perguntas' => 'required|array|min:1',
        ];

        $feedback = [
            'titulo.required' => 'O título é obrigatório',
            'titulo.min' => 'O título precisa ter no mínimo 3 caracteres',
            'titulo.max' => 'O título precisa ter no máximo 255 caracteres',
            'perguntas.required' => 'As perguntas são obrigatórias',
            'perguntas.array' => 'Formato inválido de perguntas',
            'perguntas.min' => 'É necessário ter no mínimo 1 pergunta',
        ];

        $request->validate($regras, $feedback);

        $errorPerguntas = [];

        foreach ($request->perguntas as $key => $pergunta) {
            if (empty($pergunta['pergunta'])) {
                $errorPerguntas["pergunta_$key"] = 'A pergunta é obrigatória';
            }
        }

        if (!empty($errorPerguntas)) {
            return $this->responseErrors($errorPerguntas);
        }

        DB::beginTransaction();

        try {
            $questionario = Questionario::create([
                'nutricionista_id' => Auth::user()->nutricionista->id,
                'titulo' => $request->titulo,
            ]);

            foreach ($request->perguntas as $pergunta) {
                $status = $questionario->perguntas()->create([
                    'pergunta' => $pergunta['pergunta'],
                ]);

                if (!$status) {
                    DB::rollBack();
                    return $this->responseErrors(['error' => "Falha ao cadastrar as perguntas!"]);
                }
            }

            DB::commit();
            return $this->response('admin.questionarios.cadastrar', ['title' => "Questionário cadastrado com sucesso!"]);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->responseErrors(['error' => "Falha ao cadastrar o questionário!"]);
        }
    }
}
