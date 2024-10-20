<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginAdmin extends Controller
{
    public function index()
    {
        return $this->render('Auth/LoginAdmin');
    }

    public function login(Request $request)
    {
        $regras = [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ];

        $feedback = [
            'email.required' => 'O email é obrigatório',
            'email.email' => 'O email precisa ser válido',
            'password.required' => 'A senha é obrigatória',
            'password.min' => 'A senha precisa ter no mínimo 6 caracteres',
        ];

        $request->validate($regras, $feedback);

        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials) || !Auth::user()->administrador) {
            Auth::logout();

            return redirect()->back()->withErrors(['error' => 'Email ou senha inválidos']);
        }

        return redirect()->route('admin.home');
    }

    public function logout()
    {
        Auth::logout();

        return redirect()->route('login.admin');
    }
}
