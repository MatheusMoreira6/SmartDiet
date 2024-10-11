<?php

use App\Http\Controllers\DashboardAdmin;
use App\Http\Controllers\DashboardUser;
use App\Http\Controllers\LoginAdmin;
use App\Http\Controllers\LoginUser;
use App\Http\Controllers\RegisterAdmin;
use App\Http\Middleware\CheckLogout;
use App\Http\Middleware\AuthenticateAdmin;
use App\Http\Middleware\AuthenticateUser;
use Illuminate\Support\Facades\Route;

// Rotas de autenticação
Route::middleware([CheckLogout::class])->group(function () {

    Route::controller(LoginUser::class)->group(function () {
        Route::get('/user/login', 'index')->name('login.user');
        Route::post('/user/login', 'login')->name('login.user');
    });

    Route::controller(LoginAdmin::class)->group(function () {
        Route::get('/admin/login', 'index')->name('login.admin');
        Route::post('/admin/login', 'login')->name('login.admin');
    });

    Route::controller(RegisterAdmin::class)->group(function () {
        Route::get('/admin/register', 'index')->name('register.admin');
        Route::post('/admin/register', 'cadastrar')->name('register.admin');
    });
});

// Rotas do painel de administração
Route::middleware([AuthenticateAdmin::class])->prefix('admin')->group(function () {

    Route::get('/', [DashboardAdmin::class, 'index'])->name('admin.home');

    Route::prefix('profile')->group(function () {
        Route::get('/', [DashboardAdmin::class, 'profile'])->name('admin.profile');
    });

    Route::prefix('settings')->group(function () {
        Route::get('/', [DashboardAdmin::class, 'settings'])->name('admin.settings');
    });

    Route::get('/logout', [LoginAdmin::class, 'logout'])->name('logout.admin');
});

// Rotas do painel de usuário
Route::middleware([AuthenticateUser::class])->prefix('user')->group(function () {

    Route::get('/', [DashboardUser::class, 'index'])->name('user.home');

    Route::prefix('profile')->group(function () {
        Route::get('/', [DashboardUser::class, 'profile'])->name('user.profile');
    });

    Route::prefix('settings')->group(function () {
        Route::get('/', [DashboardUser::class, 'settings'])->name('user.settings');
    });

    Route::get('/logout', [LoginUser::class, 'logout'])->name('logout.user');
});

/**
 * Fallback
 */
Route::fallback(function () {
    return redirect()->route('login.user');
});
