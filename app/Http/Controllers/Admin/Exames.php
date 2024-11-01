<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Exame;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Exames extends Controller
{
    public function index()
    {
        $pacientes = Auth::user()->nutricionista->pacientes()->get()->toArray();

        $auxPacientes = [];
        foreach ($pacientes as $paciente) {
            $auxPacientes[] = [
                'id' => $paciente['id'],
                'descricao' => "{$paciente['nome']} {$paciente['sobrenome']}",
            ];
        }

        return $this->render('Admin/Exames/Exames', [
            'exames' => Exame::all(['id', 'nome'])->toArray(),
            'pacientes' => $auxPacientes,
        ]);
    }
}
