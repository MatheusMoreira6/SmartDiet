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
        $dieta = Dieta::with(['refeicoes.alimentos'])
            ->where('paciente_id', $paciente->id)
            ->first();


        if ($dieta !== null) {

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
                ->where('dieta_id', $dieta->id)->orderBy('horario')
                ->get();

            $dias = DB::table('table_grupo_dias_dieta')
                ->select()
                ->where('dieta_id',  $dieta->id)
                ->orderBy('ordem')
                ->get();



            return $this->render('User/Dietas/Dietas', ['dieta' => $dieta, 'horarios' => $horarios, 'dias' => $dias]);
        } else {
            return $this->render('User/Dietas/Dietas', ['dieta' => $dieta, 'horarios' => [], 'dias' => []]);
        }
    }
}
