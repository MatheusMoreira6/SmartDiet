<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Libraries\LibConversion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Perfil extends Controller
{
    public function index()
    {
        $nutricionista = Auth::user()->nutricionista;

        $nutricionista->data_nascimento = LibConversion::convertIsoToBr($nutricionista->data_nascimento);

        return $this->render('Admin/Perfil', [
            'dados' => $nutricionista->toArray(),
        ]);
    }
}
