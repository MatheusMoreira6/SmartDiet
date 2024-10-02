<?php

use App\Http\Controllers\Dashboard;
use App\Http\Controllers\LoginAdmin;
use App\Http\Controllers\LoginUser;
use App\Http\Controllers\RegisterAdmin;
use App\Http\Middleware\CheckLogout;
use App\Http\Middleware\AuthenticateAdmin;
use App\Http\Middleware\AuthenticateUser;
use Illuminate\Support\Facades\Route;

Route::middleware([CheckLogout::class])->group(function () {

    Route::controller(LoginUser::class)->group(function () {
        Route::get('/login', 'index')->name('login.user');
        Route::post('/login', 'login')->name('login.user');
    });

    Route::controller(LoginAdmin::class)->group(function () {
        Route::get('/admin/login', 'index')->name('login.admin');
        Route::post('/admin/login', 'login')->name('login.admin');
    });

    Route::controller(RegisterAdmin::class)->group(function () {
        Route::get('/admin/cadastrar', 'index')->name('register.admin');
        Route::post('/admin/cadastrar', 'cadastrar')->name('register.admin');
    });
});

Route::middleware([AuthenticateAdmin::class])->group(function () {

    // Logout
    Route::get('/logout', [LoginUser::class, 'logout'])->name('logout.user');

    Route::prefix('admin')->group(function () {
        Route::get('/', [Dashboard::class, 'index'])->name('admin.home');

        Route::prefix('profile')->group(function () {
            Route::get('/', [Dashboard::class, 'profile'])->name('admin.profile');
        });

        Route::prefix('settings')->group(function () {
            Route::get('/', [Dashboard::class, 'settings'])->name('admin.settings');
        });
    });
});

Route::middleware([AuthenticateUser::class])->group(function () {

    // Logout
    Route::get('/logout', [LoginUser::class, 'logout'])->name('logout.user');

    Route::prefix('user')->group(function () {
        Route::get('/', [Dashboard::class, 'index'])->name('user.home');

        Route::prefix('profile')->group(function () {
            Route::get('/', [Dashboard::class, 'profile'])->name('user.profile');
        });

        Route::prefix('settings')->group(function () {
            Route::get('/', [Dashboard::class, 'settings'])->name('user.settings');
        });
    });
});

/**
 * Fallback
 */
Route::fallback(function () {
    abort(404, 'Página não encontrada');
});
