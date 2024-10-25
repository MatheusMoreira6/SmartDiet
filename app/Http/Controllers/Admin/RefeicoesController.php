<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Refeicoes;
use Illuminate\Http\Request;

class RefeicoesController extends Controller
{
    public function buscaRefeicoes()
    {
        $refeicoes = Refeicoes::all();

        return response()->json(['refeicoes' => $refeicoes]);
    }
}