<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Libraries\LibConversion;
use App\Libraries\LibValidation;
use App\Models\Exame;
use App\Models\Paciente;
use App\Models\PedidoExame;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Exames extends Controller
{
    public function index()
    {
        $nutricionista = Auth::user()->nutricionista;

        $exames = $nutricionista->exames()->select('id', 'nome')->orderBy('nome')->get()->toArray();
        $pacientes = $nutricionista->pacientes()->get(['id', 'nome', 'sobrenome'])->toArray();
        $pacientes_exames = $nutricionista->pedidosExame()->with('paciente:id,nome,sobrenome')->get()->toArray();

        $auxPacientes = array_map(function ($paciente) {
            return [
                'id' => $paciente['id'],
                'descricao' => "{$paciente['nome']} {$paciente['sobrenome']}",
            ];
        }, $pacientes);

        $idPacientesExames = [];
        $auxPacientesExames = [];

        foreach ($pacientes_exames as $paciente_exame) {
            if (!in_array($paciente_exame['paciente']['id'], $idPacientesExames)) {
                $idPacientesExames[] = $paciente_exame['paciente']['id'];

                $auxPacientesExames[] = [
                    'id' => $paciente_exame['paciente']['id'],
                    'nome' => "{$paciente_exame['paciente']['nome']} {$paciente_exame['paciente']['sobrenome']}",
                ];
            }
        }

        return $this->render('Admin/Exames/Exames', [
            'exames' => $exames,
            'pacientes' => $auxPacientes,
            'pacientes_exames' => $auxPacientesExames,
        ]);
    }

    public function edit(int $id)
    {
        $request = new Request(['id' => $id]);

        $regras = [
            'id' => 'required|exists:pacientes,id',
        ];

        $feedback = [
            'id.required' => 'O ID é obrigatório!',
            'id.exists' => 'Paciente não encontrado!',
        ];

        $request->validate($regras, $feedback);

        try {
            $paciente = Paciente::findOrFail($request->id);
            $exames = $paciente->pedidosExames()->get(['id', 'titulo_pedido', 'data_pedido'])->sortByDesc('data_pedido')->toArray();

            $auxExames = [];
            foreach ($exames as $exame) {
                $anoPedido = date('Y', strtotime($exame['data_pedido']));

                if (!isset($auxExames[$anoPedido])) {
                    $auxExames[$anoPedido] = [
                        'ano' => $anoPedido,
                        'exames' => [],
                    ];
                }

                $auxExames[$anoPedido]['exames'][] = [
                    'id' => $exame['id'],
                    'titulo_pedido' => $exame['titulo_pedido'],
                    'data_pedido' => LibConversion::convertIsoToBr($exame['data_pedido']),
                ];
            }

            rsort($auxExames);

            return $this->render('Admin/Exames/Editar', [
                'paciente' => $paciente->toArray(),
                'anos_exames' => $auxExames,
            ]);
        } catch (Exception $e) {
            Log::error("Erro ao visualizar os exames do paciente: " . $e->getMessage());

            return $this->render('Admin/Exames/Editar', [
                'paciente' => [],
                'anos_exames' => [],
                'error_visualizacao' => "Falha ao visualizar os exames do paciente!",
            ]);
        }
    }

    public function show(int $id)
    {
        $request = new Request(['id' => $id]);

        $regras = [
            'id' => 'required|exists:pedidos_exames,id',
        ];

        $feedback = [
            'id.required' => 'O ID é obrigatório!',
            'id.exists' => 'Pedido de exame não encontrado!',
        ];

        $request->validate($regras, $feedback);

        try {
            $pedidoExame = PedidoExame::findOrFail($request->id);
            $itensPedidoExame = $pedidoExame->itensPedidoExame()->get();

            $auxPedidoExame = [
                'id' => $pedidoExame->id,
                'titulo_pedido' => $pedidoExame->titulo_pedido,
                'data_pedido' => LibConversion::convertIsoToBr($pedidoExame->data_pedido),
                'data_resultado' => LibConversion::convertIsoToBr($pedidoExame->data_resultado),
                'itens_pedido_exame' => [],
            ];

            foreach ($itensPedidoExame as $item) {
                $auxPedidoExame['itens_pedido_exame'][] = [
                    'id' => $item->exame->id,
                    'nome' => $item->exame->nome,
                    'resultado' => $item->resultado,
                    'unidade_medida' => $item->exame->unidade_medida,
                    'valor_referencia' => $item->exame->valor_referencia,
                ];
            }

            return response()->json(['exame' => $auxPedidoExame]);
        } catch (Exception $e) {
            Log::error("Erro ao visualizar o pedido de exame: " . $e->getMessage());
            return response()->json(['errors' => ['id' => 'Falha ao visualizar o pedido de exame!']], 422);
        }
    }

    public function store(Request $request)
    {
        $regras = [
            'paciente_id' => 'required|exists:pacientes,id',
            'titulo_pedido' => 'required|min:3|max:255',
            'data_pedido' => 'required',
            'itens_pedido_exame' => 'required|array|min:1',
        ];

        $feedback = [
            'paciente_id.required' => 'O paciente é obrigatório',
            'paciente_id.exists' => 'O paciente informado não existe',
            'titulo_pedido.required' => 'O título do pedido é obrigatório',
            'titulo_pedido.min' => 'O título do pedido deve ter pelo menos 3 caracteres',
            'titulo_pedido.max' => 'O título do pedido deve ter no máximo 255 caracteres',
            'data_pedido.required' => 'A data do pedido é obrigatória',
            'itens_pedido_exame.required' => 'Os itens do pedido são obrigatórios',
            'itens_pedido_exame.array' => 'Os itens do pedido devem ser um array',
            'itens_pedido_exame.min' => 'Os itens do pedido devem ter pelo menos um item',
        ];

        $request->validate($regras, $feedback);

        if (!LibValidation::validateDate($request->data_pedido, 'd/m/Y')) {
            return $this->responseErrors(['data_pedido' => 'A data do pedido é inválida']);
        }

        DB::beginTransaction();

        try {
            $pedidoExame = Auth::user()->nutricionista->pedidosExame()->create([
                'paciente_id' => $request->paciente_id,
                'titulo_pedido' => $request->titulo_pedido,
                'data_pedido' => LibConversion::convertBrToIso($request->data_pedido),
            ]);

            if (!$pedidoExame) {
                DB::rollBack();
                return $this->responseErrors(['error' => 'Erro ao cadastrar pedido de exame']);
            }

            foreach ($request->itens_pedido_exame as $item) {
                $itemPedido = $pedidoExame->itensPedidoExame()->create([
                    'exame_id' => $item,
                ]);

                if (!$itemPedido) {
                    DB::rollBack();
                    return $this->responseErrors(['error' => 'Erro ao cadastrar item do pedido de exame']);
                }
            }

            DB::commit();
            return $this->response('admin.exames', ['title' => 'Pedido de exame cadastrado com sucesso!']);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erro ao cadastrar o pedido de exame: ' . $e->getMessage());
            return $this->responseErrors(['error' => 'Erro ao cadastrar pedido de exame']);
        }
    }

    public function update(Request $request)
    {
        $regras = [
            'id' => 'required|exists:pedidos_exames,id',
            'titulo_pedido' => 'required|min:3|max:255',
            'data_pedido' => 'required',
            'itens_pedido_exame' => 'required|array|min:1',
        ];

        $feedback = [
            'id.required' => 'O ID é obrigatório',
            'id.exists' => 'Pedido de exame não encontrado',
            'titulo_pedido.required' => 'O título do pedido é obrigatório',
            'titulo_pedido.min' => 'O título do pedido deve ter pelo menos 3 caracteres',
            'titulo_pedido.max' => 'O título do pedido deve ter no máximo 255 caracteres',
            'data_pedido.required' => 'A data do pedido é obrigatória',
            'itens_pedido_exame.required' => 'Os itens do pedido são obrigatórios',
            'itens_pedido_exame.array' => 'Os itens do pedido devem ser um array',
            'itens_pedido_exame.min' => 'Os itens do pedido devem ter pelo menos um item',
        ];

        $request->validate($regras, $feedback);

        if (!LibValidation::validateDate($request->data_pedido, 'd/m/Y')) {
            return $this->responseErrors(['data_pedido' => 'A data do pedido é inválida']);
        }

        if (!empty($request->data_resultado) && !LibValidation::validateDate($request->data_resultado, 'd/m/Y')) {
            return $this->responseErrors(['data_resultado' => 'A data do resultado é inválida']);
        }

        foreach ($request->itens_pedido_exame as $item) {
            if (empty($item['id'])) {
                return $this->responseErrors(['itens_pedido_exame' => 'O ID do exame é obrigatório']);
            } else if (!empty($item['resultado']) && empty($request->data_resultado)) {
                return $this->responseErrors(['data_resultado' => 'A data do resultado é obrigatória']);
            }
        }

        DB::beginTransaction();

        try {
            $pedidoExame = PedidoExame::findOrFail($request->id);
            $pedidoExame->titulo_pedido = $request->titulo_pedido;
            $pedidoExame->data_pedido = LibConversion::convertBrToIso($request->data_pedido);
            $pedidoExame->data_resultado = LibConversion::convertBrToIso($request->data_resultado);

            if (!$pedidoExame->save()) {
                DB::rollBack();
                return $this->responseErrors(['error' => 'Erro ao atualizar pedido de exame']);
            }

            foreach ($request->itens_pedido_exame as $item) {
                $itemPedido = $pedidoExame->itensPedidoExame()->where('exame_id', $item['id'])->first();

                if ($itemPedido) {
                    $itemPedido->resultado = $item['resultado'];

                    if (!$itemPedido->save()) {
                        DB::rollBack();
                        return $this->responseErrors(['error' => 'Erro ao atualizar item do pedido de exame']);
                    }
                } else {
                    DB::rollBack();
                    return $this->responseErrors(['error' => 'Erro ao atualizar item do pedido de exame']);
                }
            }

            DB::commit();
            return $this->response('admin.exames.edit', ['title' => 'Pedido de exame atualizado com sucesso!'], ['id' => $pedidoExame->paciente_id]);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erro ao atualizar o pedido de exame: ' . $e->getMessage());
            return $this->responseErrors(['error' => 'Erro ao atualizar pedido de exame']);
        }
    }

    public function delete(Request $request)
    {
        $regras = [
            'id' => 'required|exists:pedidos_exames,id',
        ];

        $feedback = [
            'id.required' => 'O ID é obrigatório!',
            'id.exists' => 'Pedido de exame não encontrado!',
        ];

        $request->validate($regras, $feedback);

        DB::beginTransaction();

        try {
            $pedidoExame = PedidoExame::findOrFail($request->id);

            $pacienteID = $pedidoExame->paciente_id;

            $status = $pedidoExame->delete();

            if (!$status) {
                return $this->responseErrors(['error' => 'Falha ao excluir o pedido de exame!']);
            }

            DB::commit();

            if (Paciente::find($pacienteID)->pedidosExames()->count() == 0) {
                $props = [
                    'title' => 'Excluido Todos os Pedidos!',
                    'text' => 'Todos os pedidos de exame do paciente foram excluídos com sucesso.',
                    'nenhum_exame' => true,
                ];
            } else {
                $props = [
                    'title' => 'Pedido de exame excluído com sucesso!',
                    'text' => '',
                    'nenhum_exame' => false,
                ];
            }

            return $this->response('admin.exames.edit', $props, ['id' => $pacienteID]);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erro ao excluir o pedido de exame: ' . $e->getMessage());
            return $this->responseErrors(['error' => 'Falha ao excluir o pedido de exame!']);
        }
    }
}
