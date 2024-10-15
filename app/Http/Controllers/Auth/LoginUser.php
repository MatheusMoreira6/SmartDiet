<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginUser extends Controller
{
    public function index()
    {
        return $this->render('Auth/LoginUser');
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

        if (!Auth::attempt($credentials) || Auth::user()->administrador) {
            Auth::logout();

            return redirect()->back()->withErrors(['error' => 'Email ou senha inválidos']);
        }

        return redirect()->route('user.home');
    }

    public function logout()
    {
        Auth::logout();

        return redirect()->route('login.user');
    }
}
