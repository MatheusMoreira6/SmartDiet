<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Agendamentos extends Controller
{
    public function index()
    {
        return $this->render('Admin/Agendamentos');
    }
}
