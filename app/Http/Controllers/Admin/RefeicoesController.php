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
            'alimentos' => 'required|array',
            'dia' => 'required',
            'horario' => 'required',
            'dieta_id' => 'required'
        ]);

        $refeicao = Refeicoes::where('dieta_id', $request->dieta_id)
            ->where('dia_semana_id', $request->dia)
            ->where('horario_id', $request->horario)
            ->first();

        if ($refeicao) {
            DB::table('alimento_refeicao')
                ->where('refeicao_id', $refeicao->id)
                ->delete();
        } else {
            $refeicao = Refeicoes::create([
                'dieta_id' => $request->dieta_id,
                'horario_id' => $request->horario,
                'dia_semana_id' => $request->dia
            ]);
        }

        foreach ($request->alimentos as $alimentoId) {
            DB::table('alimento_refeicao')->insert([
                'alimento_id' => $alimentoId,
                'refeicao_id' => $refeicao->id
            ]);
        }

        return response()->json(['success' => true]);
    }
}