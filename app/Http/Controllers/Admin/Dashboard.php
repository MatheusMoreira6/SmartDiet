<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Libraries\LibConversion;
use Illuminate\Support\Facades\Auth;

class Dashboard extends Controller
{
    public function index()
    {
        $nutricionista = Auth::user()->nutricionista;

        /**
         * Consultas que ainda não foram
         * finalizadas no ano vigente
         */
        $consultas = $nutricionista->consultas()
            ->with('paciente:id,nome,sobrenome,telefone')
            ->where('finalizada', false)
            ->whereYear('data', date('Y'))
            ->whereMonth('data', '>=', date('m'))
            ->get(['id', 'paciente_id', 'data', 'hora'])->toArray();

        $auxConsultas = array_map(function ($consulta) {
            return [
                'id' => $consulta['id'],
                'paciente' => $consulta['paciente']['nome'] . ' ' . $consulta['paciente']['sobrenome'],
                'telefone' => $consulta['paciente']['telefone'],
                'data' => LibConversion::convertIsoToBr($consulta['data']),
                'hora' => $consulta['hora'],
            ];
        }, $consultas);

        /**
         * Consultas que já foram
         * finalizadas no ano vigente
         */
        $consultasFinalizadas = $nutricionista->consultas()
            ->where('finalizada', true)
            ->whereYear('data', date('Y'))
            ->get(['id', 'paciente_id', 'data'])->toArray();

        $dadosConsultasMes = [];

        for ($i = 1; $i <= 12; $i++) {
            $dadosConsultasMes[$i] = 0;
        }

        foreach ($consultasFinalizadas as $consulta) {
            $mes = date('m', strtotime($consulta['data']));
            $dadosConsultasMes[$mes] += 1;
        }

        /**
         * Questionários e Exames Pendentes/Concluídos
         */
        $pacientes = $nutricionista->pacientes()->get(['id', 'questionario_id'])->toArray();
        $exames = $nutricionista->pedidosExame()->get(['id', 'data_resultado'])->toArray();

        $pendentes = [
            'questionarios' => 0,
            'exames' => 0
        ];

        $concluidos = [
            'questionarios' => 0,
            'exames' => 0
        ];

        foreach ($pacientes as $paciente) {
            if ($paciente['questionario_id'] !== null) {
                $pendentes['questionarios'] += 1;
            } else {
                $concluidos['questionarios'] += 1;
            }
        }

        foreach ($exames as $exame) {
            if ($exame['data_resultado'] === null) {
                $pendentes['exames'] += 1;
            } else {
                $concluidos['exames'] += 1;
            }
        }

        return $this->render('Admin/Home', [
            'consultas' => $auxConsultas,
            'consultas_mes' => array_values($dadosConsultasMes),
            'documentos_pendentes' => array_values($pendentes),
            'documentos_concluidos' => array_values($concluidos)
        ]);
    }
}
