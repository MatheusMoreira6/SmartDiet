<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class Configuracoes extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return $this->render('Admin/Configuracoes', [
            'dados' => $user
        ]);
    }

    public function salvar(Request $request)
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

        $user = User::find($auth->id);

        $user->email = $request->email;

        if ($request->password_new) {
            if (!$request->password_old) {
                return $this->responseErrors(['password_old' => 'A senha antiga é obrigatória']);
            }

            if (!Hash::check($request->password_old, $user->password)) {
                return $this->responseErrors(['password_old' => 'A senha antiga está incorreta']);
            }

            $user->password = Hash::make($request->password_new);
        }

        if (!$user->save()) {
            return $this->responseErrors(['error' => 'Falha ao atualizar o cadastro']);
        }

        return $this->response('admin.configuracoes', ['title' => 'Cadastro atualizado com sucesso!']);
    }
}
