<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Pacientes extends Controller
{
    public function index()
    {
        return $this->render('Admin/Pacientes');
    }
}
