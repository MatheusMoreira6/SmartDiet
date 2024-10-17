<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormDataAdminRequest;
use App\Models\Genero;
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
        return $this->render('Auth/CadastroAdmin', [
            'generos' => Genero::all()->toArray()
        ]);
    }

    public function cadastrar(FormDataAdminRequest $request)
    {
        $request->validated();

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
                    'genero_id' => $request->genero_id,
                    'cpf' => $request->cpf,
                    'crn' => $request->crn,
                    'telefone' => $request->telefone,
                    'telefone_fixo' => $request->telefone_fixo,
                ]);
            });
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Falha ao cadastrar o usuário']);
        }

        Auth::attempt($request->only('email', 'password'));

        return redirect()->route('admin.home');
    }
}
