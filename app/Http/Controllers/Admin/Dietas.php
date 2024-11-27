<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alimento;
use App\Models\Dieta as ModelDietas;
use App\Models\Nutricionista;
use App\Models\Refeicoes;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Dietas extends Controller
{

    public function buscaDieta($id)
    {
        $dietas = ModelDietas::where('paciente_id', $id)
            ->orderBy('created_at')
            ->get();

        foreach ($dietas as $dieta) {
            $refeicoes = $this->formattedRefeicoesDietas($dieta->id);

            $dieta['refeicoes'] = $refeicoes;
        }

        return response()->json(['dietas' => $dietas]);
    }

    static public function formattedRefeicoesDietas($dieta_id)
    {
        $refeicoes = Refeicoes::with(['alimentos' => function ($query) {

            $query->with('tipoPorcao');
        }])
            ->where('dieta_id', $dieta_id)
            ->where('id_ref_alt', null)
            ->get();

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

        return $refeicoes;
    }

    public function salvar(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'required|string',
            'horarios' => 'required|array|min:1',
            'horarios.*.horario' => 'required|string',
            'grupos_dias' => 'required|array|min:1',
            'grupos_dias.*.grupo_dia' => 'required|string',
        ]);

        DB::beginTransaction();

        try {
            if (isset($request['id_nutricionista'])) {
                $nutricionista = Nutricionista::findOrFail($request['id_nutricionista']);
            } else {
                $nutricionista = Auth::user()->nutricionista;
            }

            $dieta = ModelDietas::create([
                'nome_dieta' => $request->nome,
                'descricao' => $request->descricao,
                'nutricionista_id' => $nutricionista->id,
                'paciente_id' => $request->id_paciente,
            ]);

            if (!$dieta) {
                DB::rollBack();
                response()->json(['erro' => 'erro ao cadastrar dieta']);
            }

            foreach ($request->grupos_dias as $index => $grupo) {
                DB::table('table_grupo_dias_dieta')->insert([
                    'nome_grupo' => $grupo['grupo_dia'],
                    'ordem' => $index + 1,
                    'dieta_id' => $dieta->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            $grupos_dias = DB::table('table_grupo_dias_dieta')->where('dieta_id', $dieta->id)->get();
            foreach ($grupos_dias as $grupo) {
                foreach ($request->horarios as $horario) {
                    DB::table('table_horarios_dietas')->insert([
                        'horario' => $horario['horario'],
                        'dieta_id' => $dieta->id,
                        'grupo_id' => $grupo->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }

            DB::commit();

            $dietas = ModelDietas::where("nutricionista_id", $nutricionista->id)
                ->where("paciente_id", $request->id_paciente)
                ->orderBy('created_at')->get();

            foreach ($dietas as $dieta) {
                $refeicoes = $this->formattedRefeicoesDietas($dieta->id);

                $dieta['refeicoes'] = $refeicoes;
            }

            response()->json(["dietas" => $dietas]);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erro ao cadastrar a dieta:' . $e->getMessage());
            response()->json(['erro' => 'erro ao cadastrar dieta']);
        }
    }

    public function cadastroGrupo(Request $request)
    {
        $request->validate([
            'ordem' => 'required|integer',
            'dieta_id' => 'required|integer|exists:dietas,id',
            'horarios' => 'required|array|min:1',
            'grupos_dias' => 'required|array|min:1',
            'grupos_dias.*.grupo_dia' => 'required|string',
        ]);

        DB::beginTransaction();

        try {
            foreach ($request->grupos_dias as $index => $grupo) {
                $index  += 1;
                $grupo = DB::table('table_grupo_dias_dieta')->insert([
                    'nome_grupo' => $grupo['grupo_dia'],
                    'ordem' => $index + $request->ordem,
                    'dieta_id' => $request->dieta_id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                if (!$grupo) {
                    DB::rollBack();
                }
            }

            $grupos_dias = DB::table('table_grupo_dias_dieta')->where('ordem', '>', $request->ordem)->get();

            foreach ($grupos_dias as $grupo) {
                foreach ($request->horarios as $horario) {
                   $horario = DB::table('table_horarios_dietas')->insert([
                        'horario' => $horario['horario'],
                        'dieta_id' => $request->dieta_id,
                        'grupo_id' => $grupo->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    if (!$horario) {
                        DB::rollBack();
                    }
                }
            }

            DB::commit();

            $dietas = ModelDietas::where("nutricionista_id", $request->id_nutricionista)
                ->where("paciente_id", $request->id_paciente)->orderBy('created_at')
                ->get();

            foreach ($dietas as $dieta) {
                $refeicoes = $this->formattedRefeicoesDietas($dieta->id);

                $dieta['refeicoes'] = $refeicoes;
            }

            response()->json(["dietas" => $dietas]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Erro ao cadastrar a grupo:' . $e->getMessage());
            response()->json(['erro' => 'erro ao cadastrar grupo']);
        }
    }

    public function deleteGrupo(Request $request)
    {
        $request->validate([
            'dieta_id' => 'required|integer|exists:dietas,id',
            'dia_id' => 'required|integer|exists:table_grupo_dias_dieta,id',
        ]);

        DB::table('table_grupo_dias_dieta')->where('dieta_id', $request->dieta_id)->where('id', $request->dia_id)->delete();
        $dietas = ModelDietas::where("nutricionista_id", $request->id_nutricionista)
            ->where("paciente_id", $request->id_paciente)
            ->orderBy('created_at')->get();

        foreach ($dietas as $dieta) {
            $refeicoes = $this->formattedRefeicoesDietas($dieta->id);

            $dieta['refeicoes'] = $refeicoes;
        }

        return response()->json(["dietas" => $dietas]);
    }

    public function editaDia(Request $request)
    {
        $validatedData = $request->validate([
            'grupo_dia' => 'required|integer|exists:table_grupo_dias_dieta,id',
            'newNome' => 'required|string|max:255',
        ]);

        try {
            DB::table('table_grupo_dias_dieta')
                ->where('id', $validatedData['grupo_dia'])
                ->update(['nome_grupo' => $validatedData['newNome']]);

            return response()->json(['message' => 'Nome do grupo atualizado com sucesso!'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar o nome do grupo.'], 500);
        }
    }


    public function buscaDiasHorarios($id)
    {
        $dias = DB::table('table_grupo_dias_dieta')
            ->select()
            ->where('dieta_id', $id)
            ->orderBy('ordem')
            ->get();

        $horarios = DB::table('table_horarios_dietas')->select()->where('dieta_id', $id)->get();

        return response()->json(['dias' => $dias, 'horarios' => $horarios]);
    }

    public function buscaAlimentos()
    {
        $alimentos = Alimento::with('tipoPorcao')->get()->groupBy('tipo_alimento');

        return response()->json(['alimentos' => $alimentos]);
    }

    public function editaStatus(Request $request)
    {
        try {
            $request->validate([
                'dieta_id' => 'required|integer|exists:dietas,id',
                'status' => 'boolean',
            ]);

            $dieta = ModelDietas::where('id', $request->dieta_id);

            $dieta->update(['ativa' => $request->status]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar status da dieta.'], 500);
        }
    }
}