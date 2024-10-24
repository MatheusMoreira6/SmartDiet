<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormDataUserRequest;
use App\Models\Genero;
use App\Models\Paciente;
use App\Models\User;
use Exception;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Pacientes extends Controller
{
    public function index()
    {
        $nutricionista = Auth::user()->nutricionista;

        return $this->render('Admin/Pacientes/Pacientes', [
            'generos' => Genero::all()->toArray(),
            'pacientes' => $nutricionista->pacientes()->get()->toArray()
        ]);
    }

    public function cadastrar(FormDataUserRequest $request)
    {
        $request->validated();

        // Gerar a senha aleatória se não fornecida
        $password = empty($request->password) ? Str::random(8) : $request->password;

        try {
            DB::transaction(function () use ($request, $password) {
                $user = User::create([
                    'nome' => $request->nome,
                    'email' => $request->email,
                    'password' => Hash::make($password),
                    'password_temp' => $password,
                    'administrador' => false,
                ]);

                Paciente::create([
                    'user_id' => $user->id,
                    'nutricionista_id' => Auth::user()->nutricionista->id,
                    'nome' => $request->nome,
                    'sobrenome' => $request->sobrenome,
                    'data_nascimento' => $request->data_nascimento,
                    'genero_id' => $request->genero_id,
                    'cpf' => $request->cpf,
                    'telefone' => $request->telefone,
                ]);
            });

            return $this->response('admin.pacientes', [
                'title' => 'Cadastro realizado com sucesso!',
                'text' => 'Senha temporária: ' . $password,
            ]);
        } catch (Exception $e) {
            return $this->responseErrors(['error' => 'Falha ao cadastrar o paciente!']);
        }
    }

    public function getDados($id)
    {
        $dados_paciente =  Paciente::where('id', $id)->first();

        $dados_paciente['genero'] = Genero::where('id', $dados_paciente['genero_id'])->first();

        return $this->render('Admin/Pacientes/DadosPaciente', [
            'dados' => $dados_paciente
        ]);
    }
}