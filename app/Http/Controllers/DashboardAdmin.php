<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardAdmin extends Controller
{
    public function index()
    {
        return $this->render('Admin/Home');
    }

    public function pacientes()
    {
        return $this->render('Admin/Pacientes');
    }

    public function agendamentos()
    {
        return $this->render('Admin/Agendamentos');
    }

    public function exames()
    {
        return $this->render('Admin/Exames');
    }

    public function questionarios()
    {
        return $this->render('Admin/Questionarios');
    }
}
