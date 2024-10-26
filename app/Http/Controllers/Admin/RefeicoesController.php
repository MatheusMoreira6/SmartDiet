<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Refeicoes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RefeicoesController extends Controller
{
    public function buscaRefeicoes()
    {
        $refeicoes = Refeicoes::all();

        return response()->json(['refeicoes' => $refeicoes]);
    }

    public function salvarRefeicao(Request $request)
    {
        $request->validate([
            'alimentos' => 'required',
            'dia' => 'required',
            'horario' => 'required',
            'dieta_id' => 'required'
        ]);

        $refeicao = Refeicoes::create([
            'dieta_id' => $request->dieta_id,
            'horario_id' => $request->horario,
            'dia_semana_id' => $request->dia
        ]);

        foreach ($request->alimentos as $alimento) {

            DB::table('alimento_refeicao')->insert([
                'alimento_id' => $alimento,
                'refeicao_id' => $refeicao['id']
            ]);
        };

        response()->json(['succes' => true]);
    }
}