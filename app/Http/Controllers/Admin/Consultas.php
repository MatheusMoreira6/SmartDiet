<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Consultas extends Controller
{
    public function index()
    {
        return $this->render('Admin/Consultas');
    }
}
