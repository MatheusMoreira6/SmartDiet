<?php

// Controllers Admin
use App\Http\Controllers\Admin\Dashboard as DashboardAdmin;
use App\Http\Controllers\Admin\Agendamentos as AgendamentosAdmin;
use App\Http\Controllers\Admin\Exames as ExamesAdmin;
use App\Http\Controllers\Admin\Pacientes as PacientesAdmin;
use App\Http\Controllers\Admin\Questionarios as QuestionariosAdmin;
use App\Http\Controllers\Admin\Perfil as PerfilAdmin;
use App\Http\Controllers\Admin\Configuracoes as ConfiguracoesAdmin;

// Controllers Auth
use App\Http\Controllers\Auth\CadastroAdmin as CadastroAdmin;
use App\Http\Controllers\Auth\LoginAdmin as LoginAdmin;
use App\Http\Controllers\Auth\LoginUser as LoginUser;

// Controllers User
use App\Http\Controllers\User\Dashboard as DashboardUser;
use App\Http\Controllers\User\Perfil as PerfilUser;
use App\Http\Controllers\User\Configuracoes as ConfiguracoesUser;

// Middlewares
use App\Http\Middleware\CheckLogout;
use App\Http\Middleware\AuthenticateAdmin;
use App\Http\Middleware\AuthenticateUser;

// Facades
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

    Route::controller(CadastroAdmin::class)->group(function () {
        Route::get('/admin/register', 'index')->name('register.admin');
        Route::post('/admin/register', 'cadastrar')->name('register.admin');
    });
});

// Rotas do painel de administração
Route::middleware([AuthenticateAdmin::class])->prefix('admin')->group(function () {

    Route::get('/', [DashboardAdmin::class, 'index'])->name('admin.home');
    Route::get('/pacientes', [PacientesAdmin::class, 'index'])->name('admin.pacientes');
    Route::get('/agendamentos', [AgendamentosAdmin::class, 'index'])->name('admin.agendamentos');
    Route::get('/exames', [ExamesAdmin::class, 'index'])->name('admin.exames');
    Route::get('/questionarios', [QuestionariosAdmin::class, 'index'])->name('admin.questionarios');

    Route::controller(PerfilAdmin::class)->prefix('perfil')->group(function () {
        Route::get('/', 'index')->name('admin.perfil');
    });

    Route::controller(ConfiguracoesAdmin::class)->prefix('configuracoes')->group(function () {
        Route::get('/', 'index')->name('admin.configuracoes');
    });

    Route::get('/logout', [LoginAdmin::class, 'logout'])->name('logout.admin');
});

// Rotas do painel de usuário
Route::middleware([AuthenticateUser::class])->prefix('user')->group(function () {

    Route::get('/', [DashboardUser::class, 'index'])->name('user.home');

    Route::controller(PerfilUser::class)->prefix('perfil')->group(function () {
        Route::get('/', 'index')->name('user.perfil');
    });

    Route::controller(ConfiguracoesUser::class)->prefix('configuracoes')->group(function () {
        Route::get('/', 'index')->name('user.configuracoes');
    });

    Route::get('/logout', [LoginUser::class, 'logout'])->name('logout.user');
});

/**
 * Fallback
 */
Route::fallback(function () {
    return redirect()->route('login.user');
});
