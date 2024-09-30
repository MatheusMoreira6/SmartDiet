<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginUser extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $regras = [
            'email' => 'required|email',
            'password' => 'required',
        ];

        $feedback = [
            'required' => 'O campo :attribute precisa ser preenchido',
            'email' => 'O email é inválido',
        ];

        $request->validate($regras, $feedback);

        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return redirect()->back()->withErrors(['error' => 'Email ou senha inválidos']);
        }

        return redirect()->route('dashboard.home');
    }

    public function logout()
    {
        Auth::logout();

        return redirect()->route('login.user');
    }
}
