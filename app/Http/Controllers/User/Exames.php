<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Libraries\LibConversion;
use Illuminate\Support\Facades\Auth;

class Exames extends Controller
{
    public function index()
    {
        $paciente = Auth::user()->paciente;

        $examesPendentes = $paciente->pedidosExames()
            ->where('data_resultado', null)
            ->with('paciente.genero')
            ->with('nutricionista.genero')
            ->with('itensPedidoExame.exame')
            ->orderBy('data_pedido', 'asc')
            ->get()->toArray();

        $auxExamesPendentes = array_map(function ($exame) {
            return [
                'id' => $exame['id'],
                'titulo_pedido' => $exame['titulo_pedido'],
                'data_pedido' => LibConversion::convertIsoToBr($exame['data_pedido']),
                'total_exames' => count($exame['itens_pedido_exame']),
                'paciente' => [
                    'nome' => $exame['paciente']['nome'] . ' ' . $exame['paciente']['sobrenome'],
                    'genero' => $exame['paciente']['genero']['descricao'],
                    'data_nascimento' => LibConversion::convertIsoToBr($exame['paciente']['data_nascimento']),
                    'cpf' => $exame['paciente']['cpf'],
                    'telefone' => $exame['paciente']['telefone'],
                ],
                'nutricionista' => [
                    'nome' => $exame['nutricionista']['nome'] . ' ' . $exame['nutricionista']['sobrenome'],
                    'genero' => $exame['nutricionista']['genero']['descricao'],
                    'data_nascimento' => LibConversion::convertIsoToBr($exame['nutricionista']['data_nascimento']),
                    'cpf' => $exame['nutricionista']['cpf'],
                    'crn' => $exame['nutricionista']['crn'],
                    'telefone' => $exame['nutricionista']['telefone'],
                    'telefone_fixo' => $exame['nutricionista']['telefone_fixo'],
                ],
                'itens_pedido_exame' => array_map(function ($item) {
                    return [
                        'id' => $item['exame']['id'],
                        'nome' => $item['exame']['nome'],
                        'unidade_medida' => $item['exame']['unidade_medida'],
                    ];
                }, $exame['itens_pedido_exame']),
            ];
        }, $examesPendentes);

        $examesFinalizados = $paciente->pedidosExames()
            ->where('data_resultado', '!=', null)
            ->with('itensPedidoExame.exame')
            ->orderBy('data_resultado', 'desc')
            ->orderBy('id', 'desc')
            ->limit(10)->get()
            ->reverse()->toArray();

        $dadosExamesFinalizados = [];
        foreach ($examesFinalizados as $exame) {
            $data = LibConversion::convertIsoToBr($exame['data_resultado']);

            foreach ($exame['itens_pedido_exame'] as $item) {
                if (!isset($dadosExamesFinalizados[$item['exame']['id']])) {
                    $dadosExamesFinalizados[$item['exame']['id']] = [
                        'id' => $item['exame']['id'],
                        'nome' => $item['exame']['nome'],
                        'unidade_medida' => $item['exame']['unidade_medida'],
                        'datas_resultados' => [],
                        'resultados' => [],
                    ];
                }

                $dadosExamesFinalizados[$item['exame']['id']]['datas_resultados'][] = $data;
                $dadosExamesFinalizados[$item['exame']['id']]['resultados'][] = $item['resultado'];
            }
        }

        return $this->render('User/Exames/Exames', [
            'pendentes' => $auxExamesPendentes,
            'exames_finalizados' => array_values($dadosExamesFinalizados),
        ]);
    }
}
