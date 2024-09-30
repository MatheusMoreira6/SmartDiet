<?php

use App\Http\Controllers\Dashboard;
use App\Http\Controllers\LoginUser;
use App\Http\Controllers\RegisterUser;
use App\Http\Middleware\Authenticate;
use Illuminate\Support\Facades\Route;

Route::middleware([Authenticate::class])->group(function () {
    Route::controller(LoginUser::class)->group(function () {
        Route::get('/login', 'index')->name('login.user');
        Route::post('/login', 'login')->name('login.user');
        Route::get('/logout', 'logout')->name('logout.user');
    });
    
    Route::controller(RegisterUser::class)->group(function () {
        Route::get('/cadastrar', 'index')->name('register.user');
        Route::post('/cadastrar', 'cadastrar')->name('register.user');
    });

    Route::get('/', [Dashboard::class, 'index'])->name('dashboard.home');
});

/**
 * Fallback
 */
Route::fallback(function () {
    abort(404, 'Página não encontrada');
});
