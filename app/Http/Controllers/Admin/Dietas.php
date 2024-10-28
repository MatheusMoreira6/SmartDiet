<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dieta as ModelDietas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Dietas extends Controller
{

    public function buscaDieta($id)
    {
        $dietas = ModelDietas::with(['refeicoes.alimentos'])
            ->where('paciente_id', $id)
            ->get();

        return response()->json(['dietas' => $dietas]);
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

        $dieta = ModelDietas::create([
            'nome_dieta' => $request->nome,
            'descricao' => $request->descricao,
            'nutricionista_id' => $request->id_nutricionista,
            'paciente_id' => $request->id_paciente,
        ]);

        foreach ($request->horarios as $horario) {
            DB::table('table_horarios_dietas')->insert([
                'horario' => $horario['horario'],
                'dieta_id' => $dieta->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
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

        $dietas = ModelDietas::where("nutricionista_id", $request->id_nutricionista)
            ->where("paciente_id", $request->id_paciente)
            ->get();

        response()->json(["dietas" => $dietas]);
    }


    public function buscaDiasHorarios($id)
    {
        $dias = DB::table('table_grupo_dias_dieta')->select()->where('dieta_id', $id)->get();
        $horarios = DB::table('table_horarios_dietas')->select()->where('dieta_id', $id)->get();

        return response()->json(['dias' => $dias, 'horarios' => $horarios]);
    }

    public function buscaAlimentos()
    {
        $alimentos = DB::table('alimentos')->select()->get()->groupBy('tipo_alimento');

        return response()->json(['alimentos' => $alimentos]);
    }
}
