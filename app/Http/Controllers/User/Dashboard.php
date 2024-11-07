<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\AgendaConsulta;
use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Dashboard extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $paciente = Paciente::where('user_id', $user->id)->first();

        $consultas = AgendaConsulta::where('paciente_id', $paciente->id)->where('finalizada', true)->get();

        return $this->render('User/Home', ['consultas' => $consultas]);
    }
}
