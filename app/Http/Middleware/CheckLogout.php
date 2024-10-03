<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckLogout
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Verifica se o usuário está deslogado
        if (Auth::check()) {
            if (Auth::user()->administrador) {
                return redirect()->route('admin.home');
            } else {
                return redirect()->route('user.home');
            }
        }

        return $next($request);
    }
}
