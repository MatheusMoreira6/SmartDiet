<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Refeicoes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RefeicoesController extends Controller
{
    public function buscaRefeicoes($dia_id, $dieta_id)
    {
        $refeicoes = $this->formattedRefeicao($dieta_id, $dia_id);

        $horarios = DB::table('table_horarios_dietas')
            ->select()
            ->where('dieta_id', $dieta_id)->orderBy('horario')
            ->get();


        return $this->render('Admin/Pacientes/Dietas/TableRefeicoes', [
            'refeicoes' => $refeicoes,
            'horarios' => $horarios,
            'dieta_id' => $dieta_id,
            'dia_id' => $dia_id
        ]);
    }

    public function editarRefeicao(Request $request)
    {
        $request->validate([
            'alimentos' => 'required|array',
            'dia' => 'required',
            'horario' => 'required',
            'dieta_id' => 'required',
            'id' => 'required',
        ]);

        $refeicao = Refeicoes::where('id', $request->id)
            ->first();

        DB::table('alimento_refeicao')
            ->where('refeicao_id', $refeicao->id)
            ->delete();

        foreach ($request->alimentos as $alimento) {
            $id_porcao = $alimento['tipo_porcao']['id'];
            DB::table('alimento_refeicao')->insert([
                'alimento_id' => $alimento['id'],
                'refeicao_id' => $refeicao->id,
                'porcao_id' => $id_porcao
            ]);
        }

        $refeicoes = $this->formattedRefeicao($request->dieta_id, $request->dia);

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


        $refeicao = Refeicoes::create([
            'dieta_id' => $request->dieta_id,
            'horario_id' => $request->horario,
            'dia_semana_id' => $request->dia,
            'id_ref_alt' => $request->ref_id,
        ]);

        foreach ($request->alimentos as $alimento) {
            $id_porcao = $alimento['tipo_porcao']['id'];
            DB::table('alimento_refeicao')->insert([
                'alimento_id' => $alimento['id'],
                'refeicao_id' => $refeicao->id,
                'porcao_id' => $id_porcao
            ]);
        }

        $refeicoes = $this->formattedRefeicao($request->dieta_id, $request->dia);


        return response()->json(['refeicoes' => $refeicoes]);
    }

    public function editaHorario(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required|integer|exists:table_horarios_dietas,id',
            'horario' => 'required|string|max:255',
            'dieta_id' => 'required|integer|exists:dietas,id',
            'dia_id' => 'required|integer|exists:table_grupo_dias_dieta,id'
        ]);

        try {
            DB::table('table_horarios_dietas')
                ->where('id', $validatedData['id'])
                ->update(['horario' => $validatedData['horario']]);

            $horarios = DB::table('table_horarios_dietas')
                ->select()
                ->where('dieta_id', $request->dieta_id)->orderBy('horario')
                ->get();


            return response()->json(['horarios' => $horarios], 200);
        } catch (\Exception $e) {
            dd($e);
            return response()->json(['message' => 'Erro ao atualizar o horairio.'], 500);
        }
    }

    static public function formattedRefeicao($dieta_id, $dia_id)
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

        return $refeicoes;
    }
}