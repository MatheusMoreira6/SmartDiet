<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Paciente;
use App\Models\PedidoExame;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Exames extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $paciente = Paciente::where('user_id', $user->id)->first();

        $exames_pedidos = PedidoExame::with('itensPedidoExame.exame')->where('paciente_id', $paciente->id)->where('data_resultado', null)->get();
        $exames_resultados = PedidoExame::with('itensPedidoExame.exame')->where('paciente_id', $paciente->id)->where('data_resultado', '<>', null)->get();
        return $this->render('User/Exames', ['exames_pedidos' => $exames_pedidos, 'exames_resultados' => $exames_resultados]);
    }
}
