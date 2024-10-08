<?php

namespace App\Http\Controllers;

use App\Models\Nutricionista;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class RegisterAdmin extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/RegisterAdmin');
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
            return redirect()->back()->withErrors(['error' => 'As senhas não conferem']);
        }

        try {
            DB::transaction(function () use ($request) {
                $user = User::create([
                    'nome' => $request->nome,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'administrador' => true,
                ]);

                Nutricionista::create([
                    'user_id' => $user->id,
                    'nome' => $request->nome,
                    'cpf' => $request->cpf,
                    'telefone' => $request->telefone,
                ]);
            });
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Falha ao cadastrar o usuário']);
        }

        Auth::attempt($request->only('email', 'password'));

        return redirect()->route('admin.home');
    }
}
