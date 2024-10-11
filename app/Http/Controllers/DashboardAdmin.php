<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardAdmin extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Home', [
            'user' => Auth::user(),
        ]);
    }
}
