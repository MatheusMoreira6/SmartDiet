<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Libraries\LibConversion;
use Illuminate\Support\Facades\Auth;

class Dashboard extends Controller
{
    public function index()
    {
        $paciente = Auth::user()->paciente;

        $consultas = $paciente->consultas()
            ->where('finalizada', true)
            ->orderBy('data', 'desc')
            ->orderBy('id', 'desc')
            ->limit(10)->get()
            ->reverse()->toArray();

        $datas_consultas = [];

        $dados_consultas = [
            'peso' => [],
            'altura' => [],
            'imc' => [],
            'cintura' => [],
            'pescoco' => [],
            'quadril' => [],
            'percentual_gordura' => [],
            'massa_muscular' => [],
        ];

        foreach ($consultas as $consulta) {
            $datas_consultas[] = LibConversion::convertIsoToBr($consulta['data']);

            $dados_consultas['peso'][] = $consulta['peso'] ?? 0;
            $dados_consultas['altura'][] = $consulta['altura'] ?? 0;
            $dados_consultas['imc'][] = $consulta['imc'] ?? 0;
            $dados_consultas['cintura'][] = $consulta['circunferencia_cintura'] ?? 0;
            $dados_consultas['quadril'][] = $consulta['circunferencia_quadril'] ?? 0;
            $dados_consultas['pescoco'][] = $consulta['circunferencia_pescoco'] ?? 0;
            $dados_consultas['percentual_gordura'][] = $consulta['percentual_gordura'] ?? 0;
            $dados_consultas['massa_muscular'][] = $consulta['massa_muscular'] ?? 0;
        }

        return $this->render('User/Home', [
            'datas_consultas' => $datas_consultas,
            'dados_consultas' => $dados_consultas
        ]);
    }
}
