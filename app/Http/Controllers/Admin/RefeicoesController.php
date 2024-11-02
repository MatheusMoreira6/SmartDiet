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
        $refeicoes = Refeicoes::with(['alimentos' => function ($query) {
            $query->with('tipoPorcao');
        }])
            ->where('dieta_id', $dieta_id)
            ->where('dia_semana_id', $dia_id)
            ->where('id_ref_alt', null)
            ->get();

        $refeicoesAlternativas = Refeicoes::with(['alimentos' => function ($query) {
            $query->with('tipoPorcao');
        }])
            ->where('dieta_id', $dieta_id)
            ->where('dia_semana_id', $dia_id)
            ->where('id_ref_alt', '<>', null)
            ->get();


        foreach ($refeicoes as $ref) {
            foreach ($refeicoesAlternativas as $refAlt) {
                if ($ref['id'] == $refAlt['id_ref_alt']) {
                    $ref['refeicao_alternativa'] = $refAlt;
                }
            }
        }

        $refeicoes->each(function ($refeicao) {
            $refeicao->alimentos->each(function ($alimento) {
                if (isset($alimento->pivot)) {
                    $porcaoId = $alimento->pivot->porcao_id;

                    $porcao = $alimento->tipoPorcao->firstWhere('id', $porcaoId);

                    $alimento->porcao = [
                        'id' => $porcaoId,
                        'nome_porcao' => $porcao->nome_porcao ?? null,
                        'calorias' => $porcao->calorias ?? null,
                        'proteinas' => $porcao->proteinas ?? null,
                        'carboidratos' => $porcao->carboidratos ?? null,
                        'gorduras' => $porcao->gorduras ?? null,
                    ];

                    $alimento->makeHidden('pivot');
                }
            });
        });

        $horarios = DB::table('table_horarios_dietas')
            ->select()
            ->where('dieta_id', $dieta_id)
            ->get();

        return $this->render('Admin/Pacientes/Dietas/TableRefeicoes', [
            'refeicoes' => $refeicoes,
            'horarios' => $horarios,
            'dieta_id' => $dieta_id,
            'dia_id' => $dia_id
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

        if ($refeicao && !($request->ref_id)) {
            DB::table('alimento_refeicao')
                ->where('refeicao_id', $refeicao->id)
                ->delete();
        } else {
            $refeicao = Refeicoes::create([
                'dieta_id' => $request->dieta_id,
                'horario_id' => $request->horario,
                'dia_semana_id' => $request->dia,
                'id_ref_alt' => $request->ref_id,
            ]);
        }

        foreach ($request->alimentos as $alimento) {
            $id_porcao = $alimento['tipo_porcao']['id'];
            DB::table('alimento_refeicao')->insert([
                'alimento_id' => $alimento['id'],
                'refeicao_id' => $refeicao->id,
                'porcao_id' => $id_porcao
            ]);
        }

        $refeicoes = Refeicoes::with(['alimentos' => function ($query) {
            $query->with('tipoPorcao');
        }])
            ->where('dieta_id', $request->dieta_id)
            ->where('dia_semana_id', $request->dia)
            ->where('id_ref_alt', null)
            ->get();

        $refeicoesAlternativas = Refeicoes::with(['alimentos' => function ($query) {
            $query->with('tipoPorcao');
        }])
            ->where('dieta_id', $request->dieta_id)
            ->where('dia_semana_id', $request->dia)
            ->where('id_ref_alt', '<>', null)
            ->get();


        foreach ($refeicoes as $ref) {
            foreach ($refeicoesAlternativas as $refAlt) {
                if ($ref['id'] == $refAlt['id_ref_alt']) {
                    $ref['refeicao_alternativa'] = $refAlt;
                }
            }
        }

        $refeicoes->each(function ($refeicao) {
            $refeicao->alimentos->each(function ($alimento) {
                if (isset($alimento->pivot)) {
                    $porcaoId = $alimento->pivot->porcao_id;

                    $porcao = $alimento->tipoPorcao->firstWhere('id', $porcaoId);

                    $alimento->porcao = [
                        'id' => $porcaoId,
                        'nome_porcao' => $porcao->nome_porcao ?? null,
                        'calorias' => $porcao->calorias ?? null,
                        'proteinas' => $porcao->proteinas ?? null,
                        'carboidratos' => $porcao->carboidratos ?? null,
                        'gorduras' => $porcao->gorduras ?? null,
                    ];

                    $alimento->makeHidden('pivot');
                }
            });
        });


        return response()->json(['refeicoes' => $refeicoes]);
    }
}
