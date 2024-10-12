<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

abstract class Controller
{
    protected function render($component, $props = [])
    {
        return Inertia::render($component, array_merge($props, [
            'user' =>  Auth::user(),
            'currentRoute' => Route::currentRouteName(),
        ]));
    }
}
