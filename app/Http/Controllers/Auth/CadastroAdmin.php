<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\CadastroAdminRequest;
use App\Models\Nutricionista;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CadastroAdmin extends Controller
{
    public function index()
    {
        return $this->render('Auth/CadastroAdmin');
    }

    public function cadastrar(CadastroAdminRequest $request)
    {
        $request->validate();

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
