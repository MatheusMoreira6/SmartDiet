<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Nutricionista;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Libraries\LibValidation;

class CadastroAdmin extends Controller
{
    public function index()
    {
        return $this->render('Auth/CadastroAdmin');
    }

    public function cadastrar(Request $request)
    {
        $regras = [
            'nome' => 'required|min:3|max:100',
            'sobrenome' => 'required|min:3|max:100',
            'data_nascimento' => 'required',
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
            'sobrenome.min' => 'O campo sobrenome precisa ter no mínimo 3 caracteres',
            'sobrenome.max' => 'O campo sobrenome deve ter no máximo 100 caracteres',
            'data_nascimento' => 'A data de nascimento é obrigatória',
            'cpf.size' => 'O CPF deve ter 14 caracteres',
            'telefone.size' => 'O telefone deve ter 15 caracteres',
            'email' => 'O email é inválido',
            'password' => 'A senha é obrigatória',
            'password_confirmation' => 'A confirmação de senha é obrigatória',
        ];

        $request->validate($regras, $feedback);

        if (!LibValidation::validateDateOfBirth($request->data_nascimento, 'd/m/Y')) {
            return redirect()->back()->withErrors(['data_nascimento' => 'A data de nascimento é inválida']);
        }

        if (!LibValidation::validateCPF($request->cpf)) {
            return redirect()->back()->withErrors(['cpf' => 'O CPF é inválido']);
        }

        if ($request->password !== $request->password_confirmation) {
            return redirect()->back()->withErrors(['password' => 'As senhas não conferem']);
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
                    'sobrenome' => $request->sobrenome,
                    'data_nascimento' => $request->data_nascimento,
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
