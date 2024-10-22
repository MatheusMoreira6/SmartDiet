<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormDataUserRequest;
use App\Libraries\LibConversion;
use App\Models\Genero;
use Exception;
use Illuminate\Support\Facades\Auth;

class Perfil extends Controller
{
    public function index()
    {
        $paciente = Auth::user()->paciente;

        $paciente->data_nascimento = LibConversion::convertIsoToBr($paciente->data_nascimento);

        return $this->render('User/Perfil', [
            'dados' => $paciente->toArray(),
            'generos' => Genero::all()->toArray()
        ]);
    }

    public function salvar(FormDataUserRequest $request)
    {
        $request->validated();

        $paciente = Auth::user()->paciente;
        $user = $paciente->user;

        try {
            $update = [
                $paciente->update($request->all()),
                $user->update(['nome' => $request->nome]),
            ];

            if (in_array(false, $update)) {
                return $this->responseErrors(['error' => 'Falha ao atualizar o cadastro']);
            }
        } catch (Exception $e) {
            return $this->responseErrors(['error' => 'Falha ao atualizar o cadastro']);
        }

        return $this->response('user.perfil', ['title' => 'Cadastro atualizado com sucesso!']);
    }
}
