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
            'descricao' => 'required|string'
        ]);

        ModelDietas::create([
            'nome_dieta' => $request->nome,
            'descricao' => $request->descricao,
            'nutricionista_id' => $request->id_nutricionista,
            'paciente_id' => $request->id_paciente
        ]);

        $dietas = ModelDietas::where("nutricionista_id", $request->id_nutricionista)->where("paciente_id", $request->id_paciente)->get();
        response()->json(["dietas" => $dietas]);
    }

    public function buscaDiasHorarios()
    {
        $dias = DB::table('dias_semanas')->select()->get();
        $horarios = DB::table('horarios')->select()->get();

        return response()->json(['dias' => $dias, 'horarios' => $horarios]);
    }

    public function buscaAlimentos()
    {
        $alimentos = DB::table('alimentos')->select()->get()->groupBy('tipo_alimentos');

        return response()->json(['alimentos' => $alimentos]);
    }
}