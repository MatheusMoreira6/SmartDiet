<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\FormDataAdminRequest;
use App\Libraries\LibConversion;
use App\Models\Genero;
use Exception;
use Illuminate\Support\Facades\Auth;

class Perfil extends Controller
{
    public function index()
    {
        $nutricionista = Auth::user()->nutricionista;

        $nutricionista->data_nascimento = LibConversion::convertIsoToBr($nutricionista->data_nascimento);

        return $this->render('Admin/Perfil', [
            'dados' => $nutricionista->toArray(),
            'generos' => Genero::all()->toArray()
        ]);
    }

    public function salvar(FormDataAdminRequest $request)
    {
        $request->validated();

        $nutricionista = Auth::user()->nutricionista;
        $user = $nutricionista->user;

        try {
            $update = [
                $nutricionista->update($request->all()),
                $user->update(['nome' => $request->nome]),
            ];

            if (in_array(false, $update)) {
                return $this->responseErrors(['error' => 'Falha ao atualizar o cadastro']);
            }
        } catch (Exception $e) {
            $this->responseErrors(['error' => 'Falha ao atualizar o cadastro']);
        }

        $this->response('admin.perfil', ['title' => 'Cadastro atualizado com sucesso!']);
    }
}
