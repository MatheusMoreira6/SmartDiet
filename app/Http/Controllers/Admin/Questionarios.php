<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Questionario;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Questionarios extends Controller
{
    public function index()
    {
        $questionarios = Questionario::where('nutricionista_id', Auth::user()->nutricionista->id)->get();

        return $this->render('Admin/Questionarios/Questionarios', [
            'questionarios' => $questionarios->toArray(),
        ]);
    }

    public function create()
    {
        return $this->render('Admin/Questionarios/Cadastrar');
    }

    public function edit(int $id)
    {
        $request = new Request();

        $request->merge(['id' => $id]);

        $regras = [
            'id' => 'required|exists:questionarios,id',
        ];

        $feedback = [
            'id.required' => 'O ID é obrigatório!',
            'id.exists' => 'Questionário não encontrado!',
        ];

        $request->validate($regras, $feedback);

        $questionario = Questionario::find($request->id);
        $questionario->perguntas = $questionario->perguntas;

        return $this->render('Admin/Questionarios/Editar', [
            'questionario' => $questionario->toArray(),
        ]);
    }

    public function store(Request $request)
    {
        $regras = [
            'id' => 'prohibited',
            'titulo' => 'required|min:3|max:255',
            'perguntas' => 'required|array|min:1',
        ];

        $feedback = [
            'id.prohibited' => 'O ID não é permitido!',
            'titulo.required' => 'O título é obrigatório',
            'titulo.min' => 'O título precisa ter no mínimo 3 caracteres',
            'titulo.max' => 'O título precisa ter no máximo 255 caracteres',
            'perguntas.required' => 'As perguntas são obrigatórias',
            'perguntas.array' => 'Formato inválido de perguntas',
            'perguntas.min' => 'É necessário ter no mínimo 1 pergunta',
        ];

        $request->validate($regras, $feedback);

        $errorPerguntas = [];

        foreach ($request->perguntas as $pergunta) {
            if (empty($pergunta['pergunta'])) {
                $errorPerguntas["pergunta_{$pergunta['id']}"] = 'A pergunta é obrigatória';
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
            return $this->response('admin.questionarios.store', ['title' => "Questionário cadastrado com sucesso!"]);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("Erro ao cadastrar questionário: " . $e->getMessage());
            return $this->responseErrors(['error' => "Falha ao cadastrar o questionário!"]);
        }
    }

    public function update(Request $request)
    {
        $regras = [
            'id' => 'required|exists:questionarios,id',
            'titulo' => 'required|min:3|max:255',
            'perguntas' => 'required|array|min:1',
        ];

        $feedback = [
            'id.required' => 'O ID é obrigatório!',
            'id.exists' => 'Questionário não encontrado!',
            'titulo.required' => 'O título é obrigatório',
            'titulo.min' => 'O título precisa ter no mínimo 3 caracteres',
            'titulo.max' => 'O título precisa ter no máximo 255 caracteres',
            'perguntas.required' => 'As perguntas são obrigatórias',
            'perguntas.array' => 'Formato inválido de perguntas',
            'perguntas.min' => 'É necessário ter no mínimo 1 pergunta',
        ];

        $request->validate($regras, $feedback);

        $errorPerguntas = [];

        foreach ($request->perguntas as $pergunta) {
            if (empty($pergunta['pergunta'])) {
                $errorPerguntas["pergunta_{$pergunta['id']}"] = 'A pergunta é obrigatória';
            }
        }

        if (!empty($errorPerguntas)) {
            return $this->responseErrors($errorPerguntas);
        }

        DB::beginTransaction();

        try {
            $questionario = Questionario::findOrFail($request->id);
            $questionario->titulo = $request->titulo;

            if (!$questionario->save()) {
                DB::rollBack();
                return $this->responseErrors(['error' => "Falha ao editar o questionário!"]);
            }

            $perguntas = $request->perguntas;

            foreach ($perguntas as $key => $pergunta) {
                if (empty($pergunta['id']) || $pergunta['id'] <= 0) {

                    $auxPergunta = $questionario->perguntas()->create([
                        'pergunta' => $pergunta['pergunta'],
                    ]);

                    if (!$auxPergunta) {
                        DB::rollBack();
                        return $this->responseErrors(['error' => "Falha ao cadastrar as perguntas!"]);
                    }

                    $perguntas[$key]['id'] = $auxPergunta->id;
                } else {

                    $auxPergunta = $questionario->perguntas()->where('id', $pergunta['id'])->first();

                    if ($auxPergunta) {
                        $auxPergunta->pergunta = $pergunta['pergunta'];

                        if (!$auxPergunta->save()) {
                            DB::rollBack();
                            return $this->responseErrors(['error' => "Falha ao editar as perguntas!"]);
                        }
                    } else {
                        DB::rollBack();
                        return $this->responseErrors(['error' => "Pergunta com ID {$pergunta['id']} não encontrada!"]);
                    }
                }
            }

            $perguntasRemovidas = $questionario->perguntas()->whereNotIn('id', array_column($perguntas, 'id'))->get();

            foreach ($perguntasRemovidas as $pergunta) {
                if (!$pergunta->delete()) {
                    DB::rollBack();
                    return $this->responseErrors(['error' => "Falha ao excluir as perguntas!"]);
                }
            }

            DB::commit();
            return $this->response('admin.questionarios.update', ['title' => "Questionário editado com sucesso!"]);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("Erro ao editar questionário: " . $e->getMessage());

            return $this->responseErrors(['error' => $e->getMessage()]);
        }
    }

    public function delete(Request $request)
    {
        $regras = [
            'id' => 'required|exists:questionarios,id',
        ];

        $feedback = [
            'id.required' => 'O ID é obrigatório!',
            'id.exists' => 'Questionário não encontrado!',
        ];

        $request->validate($regras, $feedback);

        try {
            $questionario = Questionario::findOrFail($request->id);
            $questionario->delete();

            return $this->response('admin.questionarios', ['title' => "Questionário excluído com sucesso!"]);
        } catch (\Exception $e) {
            Log::error("Erro ao excluir questionário: " . $e->getMessage());
            return $this->responseErrors(['error' => "Falha ao excluir o questionário!"]);
        }
    }
}
