<?php

namespace App\Http\Controllers\User;

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

        if (empty($user->password_temp) && !session('props.troca_senha', false)) {
            $component = 'User/Configuracoes/Configuracoes';
        } else {
            $component = 'User/Configuracoes/ConfigPassword';
        }

        return $this->render($component, [
            'dados' => $user,
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

        return $this->response('user.configuracoes', ['title' => 'Cadastro atualizado com sucesso!']);
    }

    public function alterarSenhaPadrao(Request $request)
    {
        $auth = Auth::user();

        $regras = [
            'email' => 'required|email|unique:users,email,' . $auth->id . ',id',
            'password' => 'required|min:6|confirmed',
        ];

        $feedback = [
            'email.required' => 'O email é obrigatório',
            'email.email' => 'O email precisa ser válido',
            'email.unique' => 'O email já está em uso',
            'password.required' => 'A senha é obrigatória',
            'password.min' => 'A senha precisa ter no mínimo 6 caracteres',
            'password.confirmed' => 'As senhas não conferem',
        ];

        $request->validate($regras, $feedback);

        $user = User::find($auth->id);

        $status = $user->update([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'password_temp' => null,
        ]);

        if (!$status) {
            return $this->responseErrors(['error' => 'Falha ao atualizar o cadastro']);
        }

        return $this->response('user.configuracoes', [
            'title' => 'Cadastro atualizado com sucesso!',
            'troca_senha' => true
        ]);
    }
}
