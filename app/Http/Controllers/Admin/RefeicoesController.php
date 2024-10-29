<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Refeicoes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RefeicoesController extends Controller
{
    public function buscaRefeicoes($dieta_id, $dia_id)
    {
        $refeicoes = Refeicoes::with('aliementos')->where('dieta_id', $dieta_id)->where('dia_semana_id', $dia_id)->get();

        $alimentos =  DB::table('alimentos')->select()->get()->groupBy('tipo_alimento');

        $horarios = DB::table('table_horarios_dietas')->select()->where('dieta_id', $dieta_id)->get();

        return $this->render('Admin/Pacientes/Dietas/TableRefeicoes',[
            'refeicoes' => $refeicoes,
            'horarios' => $horarios,
            'alimentos' => $alimentos
        ]);
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