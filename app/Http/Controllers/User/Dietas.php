<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Dietas extends Controller
{
    public function index()
    {
        return $this->render('User/Dietas');
    }
}
