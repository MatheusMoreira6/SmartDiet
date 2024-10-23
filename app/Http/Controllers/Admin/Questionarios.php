<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Questionarios extends Controller
{
    public function index()
    {
        return $this->render('Admin/Questionarios/Questionarios');
    }

    public function cadastrar()
    {
        return $this->render('Admin/Questionarios/Cadastrar', [
            'tinymceApiKey' => env('TINYMCE_API_KEY'),
        ]);
    }
}
