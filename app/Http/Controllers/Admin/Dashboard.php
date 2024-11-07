<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AgendaConsulta;
use App\Models\Nutricionista;
use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Dashboard extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $nutricionista = Nutricionista::where('user_id', $user->id)->first();

        $pacientes = Paciente::with('genero')->where('nutricionista_id', $nutricionista->id)->get();

        $agenda_consutas = AgendaConsulta::where('nutricionista_id', $nutricionista->id)->get();


        return $this->render('Admin/Home', ['pacientes' => $pacientes, 'agenda_consultas' => $agenda_consutas]);
    }
}