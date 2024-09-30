<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class RegisterUser extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Cadastrar');
    }

    public function cadastrar(Request $request)
    {
        $regras = [
            'nome' => 'required|min:3|max:100',
            'cpf' => 'required|size:14',
            'telefone' => 'required|size:15',
            'email' => 'email',
            'password' => 'required',
            'password_confirmation' => 'required',
        ];

        $feedback = [
            'required' => 'O campo :attribute precisa ser preenchido',
            'nome.min' => 'O campo nome precisa ter no mínimo 3 caracteres',
            'nome.max' => 'O campo nome deve ter no máximo 100 caracteres',
            'cpf.size' => 'O CPF deve ter 14 caracteres',
            'telefone.size' => 'O telefone deve ter 15 caracteres',
            'email' => 'O email é inválido',
            'password' => 'A senha é obrigatória',
            'password_confirmation' => 'A confirmação de senha é obrigatória',
        ];

        $request->validate($regras, $feedback);

        if ($request->password !== $request->password_confirmation) {
            return Inertia::render('Auth/Cadastrar', [
                'errors' => ['error' => 'As senhas não conferem'],
            ]);
        }

        $user = User::create([
            'nome' => $request->nome,
            'cpf' => $request->cpf,
            'telefone' => $request->telefone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if (!$user) {
            return Inertia::render('Auth/Cadastrar', [
                'errors' => ['error' => 'Falha ao cadastrar o usuário'],
            ]);
        }

        Auth::attempt($request->only('email', 'password'));

        return redirect()->route('dashboard.home');
    }
}
