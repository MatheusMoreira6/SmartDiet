<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Exame;
use App\Models\ExameDefault;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class Configuracoes extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $exames = $user->nutricionista->exames()
            ->select('id', 'nome', 'unidade_medida', 'valor_referencia')
            ->orderBy('nome')
            ->get()->toArray();

        return $this->render('Admin/Configuracoes/Configuracoes', [
            'dados' => $user,
            'exames' => $exames,
        ]);
    }

    public function updateSeguranca(Request $request)
    {
        $auth = Auth::user();

        $regras = [
            'email' => 'required|email|unique:users,email,' . $auth->id . ',id',
            'password_old' => 'nullable|min:6',
            'password_new' => 'nullable|min:6',
        ];

        $feedback = [
            'email.required' => 'O email é obrigatório',
            'email.email' => 'O email precisa ser válido',
            'email.unique' => 'O email já está em uso',
            'password_old.min' => 'A senha antiga precisa ter no mínimo 6 caracteres',
            'password_new.min' => 'A nova senha precisa ter no mínimo 6 caracteres',
        ];

        $request->validate($regras, $feedback);

        DB::beginTransaction();

        try {
            $user = User::findOrFail($auth->id);

            $user->email = $request->email;

            if ($request->password_new) {
                if (!$request->password_old) {
                    DB::rollBack();
                    return $this->responseErrors(['password_old' => 'A senha antiga é obrigatória']);
                }

                if (!Hash::check($request->password_old, $user->password)) {
                    DB::rollBack();
                    return $this->responseErrors(['password_old' => 'A senha antiga está incorreta']);
                }

                $user->password = Hash::make($request->password_new);
            }

            if (!$user->save()) {
                DB::rollBack();
                return $this->responseErrors(['error' => 'Falha ao atualizar o cadastro']);
            }

            DB::commit();
            return $this->response('admin.configuracoes', ['title' => 'Cadastro atualizado com sucesso!']);
        } catch (Exception $e) {
            DB::rollBack();

            Log::error("Erro ao atualizar cadastro: {$e->getMessage()}");
            return $this->responseErrors(['error' => 'Falha ao atualizar o cadastro']);
        }
    }

    public function showExame(int $id)
    {
        $regras = [
            'id' => 'required|exists:exames,id',
        ];

        $feedback = [
            'id.required' => 'O id é obrigatório',
            'id.exists' => 'O exame não foi encontrado',
        ];

        $validator = Validator::make(['id' => $id], $regras, $feedback);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $exame = Exame::select(['id', 'nome', 'unidade_medida', 'valor_referencia'])->findOrFail($id);

            return response()->json(['exame' => $exame]);
        } catch (Exception $e) {
            Log::error("Erro ao buscar exame: {$e->getMessage()}");
            return response()->json(['errors' => ['id' => 'Falha ao buscar o exame!']], 404);
        }
    }

    public function updateExame(Request $request)
    {
        $regras = [
            'id' => 'nullable|exists:exames,id',
            'nome' => 'required|min:3|max:255',
            'unidade_medida' => 'required|min:1|max:255',
            'valor_referencia' => 'nullable|min:1|max:255',
        ];

        $feedback = [
            'id.exists' => 'O exame não foi encontrado',
            'nome.required' => 'O nome é obrigatório',
            'nome.min' => 'O nome precisa ter no mínimo 3 caracteres',
            'nome.max' => 'O nome precisa ter no máximo 255 caracteres',
            'unidade_medida.required' => 'A unidade de medida é obrigatória',
            'unidade_medida.min' => 'A unidade de medida precisa ter no mínimo 1 caractere',
            'unidade_medida.max' => 'A unidade de medida precisa ter no máximo 255 caracteres',
            'valor_referencia.min' => 'O valor de referência precisa ter no mínimo 1 caractere',
            'valor_referencia.max' => 'O valor de referência precisa ter no máximo 255 caracteres',
        ];

        $request->validate($regras, $feedback);

        $store_exame = empty($request->id);

        DB::beginTransaction();

        try {
            if ($store_exame) {
                $exame = new Exame();
                $exame->nutricionista_id = Auth::user()->nutricionista->id;
            } else {
                $exame = Exame::findOrFail($request->id);
            }

            $exame->nome = $request->nome;
            $exame->unidade_medida = $request->unidade_medida;
            $exame->valor_referencia = $request->valor_referencia;

            if (!$exame->save()) {
                DB::rollBack();
                return $this->responseErrors(['error' => 'Falha ao atualizar o exame']);
            }

            DB::commit();

            if ($store_exame) {
                return $this->response('admin.configuracoes', ['title' => 'Exame cadastrado com sucesso!']);
            } else {
                return $this->response('admin.configuracoes', ['title' => 'Exame atualizado com sucesso!']);
            }
        } catch (Exception $e) {
            DB::rollBack();

            if ($store_exame) {
                Log::error("Erro ao cadastrar exame: {$e->getMessage()}");
                return $this->responseErrors(['error' => 'Falha ao cadastrar o exame']);
            } else {
                Log::error("Erro ao atualizar exame: {$e->getMessage()}");
                return $this->responseErrors(['error' => 'Falha ao atualizar o exame']);
            }
        }
    }

    public function deleteExame(Request $request)
    {
        $regras = [
            'id' => 'required|exists:exames,id',
        ];

        $feedback = [
            'id.required' => 'O id é obrigatório',
            'id.exists' => 'O exame não foi encontrado',
        ];

        $request->validate($regras, $feedback);

        try {
            $exame = Exame::findOrFail($request->id);

            if (!$exame->delete()) {
                return $this->responseErrors(['error' => 'Falha ao deletar o exame']);
            }

            return $this->response('admin.configuracoes', ['title' => 'Exame deletado com sucesso!']);
        } catch (Exception $e) {
            Log::error("Erro ao deletar exame: {$e->getMessage()}");
            return $this->responseErrors(['error' => 'Falha ao deletar o exame']);
        }
    }

    public function importExame()
    {
        $examesDefault = ExameDefault::all();
        $nutricionista = Auth::user()->nutricionista;

        DB::beginTransaction();

        try {
            foreach ($examesDefault as $exameDefault) {
                $exame = new Exame();
                $exame->nutricionista_id = $nutricionista->id;
                $exame->nome = $exameDefault->nome;
                $exame->unidade_medida = $exameDefault->unidade_medida;
                $exame->valor_referencia = $exameDefault->valor_referencia;

                if (!$exame->save()) {
                    DB::rollBack();
                    return $this->responseErrors(['error' => 'Falha ao importar os exames']);
                }
            }

            DB::commit();

            return response()->json(['title' => 'Exames importados com sucesso!']);
        } catch (Exception $e) {
            DB::rollBack();

            Log::error("Erro ao importar exames: {$e->getMessage()}");
            return response()->json(['errors' => ['error' => 'Falha ao importar os exames']], 500);
        }
    }
}
