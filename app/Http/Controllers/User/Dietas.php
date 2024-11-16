<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Dieta;
use App\Models\Paciente;
use App\Models\Refeicoes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Dietas extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $paciente = Paciente::where('user_id', $user->id)->first();
        $dietas = Dieta::where('paciente_id', $paciente->id)->where('ativa', true)
            ->get();


        if ($dietas !== null) {

            $dietas->each(function ($dieta) {


                $refeicoes = $dieta->refeicoes;

                $refeicoesAlternativas = Refeicoes::with(['alimentos' => function ($query) {
                    $query->with('tipoPorcao');
                }])
                    ->where('dieta_id', $dieta->id)
                    ->where('id_ref_alt', '<>', null)
                    ->get();


                foreach ($refeicoes as $ref) {
                    foreach ($refeicoesAlternativas as $refAlt) {
                        if ($ref['id'] == $refAlt['id_ref_alt'] && $ref['dia_semana_id'] == $refAlt['dia_semana_id']) {
                            $ref['refeicao_alternativa'] = $refAlt;
                            $ref['refeicao_alternativa']->alimentos->each(function ($alimento) {
                                if (isset($alimento->pivot)) {

                                    $gramas = $alimento->pivot->gramas;

                                    $porcaoId = $alimento->pivot->porcao_id;

                                    $porcao = $alimento->tipoPorcao->firstWhere('id', $porcaoId);
                                    $proporcao = $gramas / 100;

                                    $alimento->porcao = [
                                        'id' => $porcaoId,
                                        'nome_porcao' => $gramas ?? null,
                                        'calorias' => ($porcao->calorias ?? 0) * $proporcao,
                                        'proteinas' => ($porcao->proteinas ?? 0) * $proporcao,
                                        'carboidratos' => ($porcao->carboidratos ?? 0) * $proporcao,
                                        'gorduras' => ($porcao->gorduras ?? 0) * $proporcao,
                                    ];
                                    $alimento->makeHidden('pivot');
                                }
                            });
                        }
                    }
                }

                $refeicoes->each(function ($refeicao) {
                    $refeicao->alimentos->each(function ($alimento) {
                        if (isset($alimento->pivot)) {

                            $gramas = $alimento->pivot->gramas;

                            $porcaoId = $alimento->pivot->porcao_id;

                            $porcao = $alimento->tipoPorcao->firstWhere('id', $porcaoId);
                            $proporcao = $gramas / 100;

                            $alimento->porcao = [
                                'id' => $porcaoId,
                                'nome_porcao' => $gramas ?? null,
                                'calorias' => ($porcao->calorias ?? 0) * $proporcao,
                                'proteinas' => ($porcao->proteinas ?? 0) * $proporcao,
                                'carboidratos' => ($porcao->carboidratos ?? 0) * $proporcao,
                                'gorduras' => ($porcao->gorduras ?? 0) * $proporcao,
                            ];
                            $alimento->makeHidden('pivot');
                        }
                    });
                });
                $dieta['horarios'] = DB::table('table_horarios_dietas')
                    ->select()
                    ->where('dieta_id', $dieta->id)->orderBy('horario')
                    ->get();

                $dieta['dias'] = DB::table('table_grupo_dias_dieta')
                    ->select()
                    ->where('dieta_id',  $dieta->id)
                    ->orderBy('ordem')
                    ->get();
            });


            return $this->render('User/Dietas/Dietas', ['dietas' => $dietas]);
        } else {
            return $this->render('User/Dietas/Dietas', ['dietas' => $dietas]);
        }
    }
}