<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Configuracoes extends Controller
{
    public function index()
    {
        return $this->render('User/Configuracoes');
    }
}
