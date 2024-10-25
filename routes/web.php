<?php

// Controllers Admin
use App\Http\Controllers\Admin\Dashboard as DashboardAdmin;
use App\Http\Controllers\Admin\Agendamentos as AgendamentosAdmin;
use App\Http\Controllers\Admin\Exames as ExamesAdmin;
use App\Http\Controllers\Admin\Pacientes as PacientesAdmin;
use App\Http\Controllers\Admin\Questionarios as QuestionariosAdmin;
use App\Http\Controllers\Admin\Perfil as PerfilAdmin;
use App\Http\Controllers\Admin\Configuracoes as ConfiguracoesAdmin;
use App\Http\Controllers\Admin\RefeicoesController;

// Controllers Auth
use App\Http\Controllers\Auth\CadastroAdmin as CadastroAdmin;
use App\Http\Controllers\Auth\LoginAdmin as LoginAdmin;
use App\Http\Controllers\Auth\LoginUser as LoginUser;
use App\Http\Controllers\DietasController;
// Controllers User
use App\Http\Controllers\User\Dashboard as DashboardUser;
use App\Http\Controllers\User\Dietas as DietasUser;
use App\Http\Controllers\User\Agendamentos as AgendamentosUser;
use App\Http\Controllers\User\Exames as ExamesUser;
use App\Http\Controllers\User\Questionarios as QuestionariosUser;
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

    Route::controller(PacientesAdmin::class)->group(function () {
        Route::get('/pacientes', 'index')->name('admin.pacientes');
        Route::post('/pacientes', 'cadastrar')->name('admin.pacientes');
        Route::get('/pacientes/{id}', 'getDados')->name('admin.pacientes.id');
    });

    Route::get('/agendamentos', [AgendamentosAdmin::class, 'index'])->name('admin.agendamentos');
    Route::get('/exames', [ExamesAdmin::class, 'index'])->name('admin.exames');

    Route::controller(QuestionariosAdmin::class)->prefix('questionarios')->group(function () {
        Route::get('/', 'index')->name('admin.questionarios');
        Route::get('/cadastrar', 'cadastrar')->name('admin.questionarios.cadastrar');
        Route::post('/cadastrar', 'salvarQuestionario')->name('admin.questionarios.cadastrar');
    });

    Route::controller(PerfilAdmin::class)->prefix('perfil')->group(function () {
        Route::get('/', 'index')->name('admin.perfil');
        Route::put('/', 'salvar')->name('admin.perfil');
    });

    Route::controller(ConfiguracoesAdmin::class)->prefix('configuracoes')->group(function () {
        Route::get('/', 'index')->name('admin.configuracoes');
        Route::put('/', 'salvar')->name('admin.configuracoes');
    });

    Route::controller(DietasController::class)->prefix('dietas')->group(function () {
        Route::post('/dietas', 'salvar')->name('dietas.salvar');
    });

    Route::controller(RefeicoesController::class)->group(function () {
        Route::get('/busca-refeicoes', 'buscaRefeicoes')->name('admin.refeicoes');
    });

    Route::get('/logout', [LoginAdmin::class, 'logout'])->name('logout.admin');
});

// Rotas do painel de usuário
Route::middleware([AuthenticateUser::class])->prefix('user')->group(function () {

    Route::get('/', [DashboardUser::class, 'index'])->name('user.home');
    Route::get('/dietas', [DietasUser::class, 'index'])->name('user.dietas');
    Route::get('/agendamentos', [AgendamentosUser::class, 'index'])->name('user.agendamentos');
    Route::get('/exames', [ExamesUser::class, 'index'])->name('user.exames');
    Route::get('/questionarios', [QuestionariosUser::class, 'index'])->name('user.questionarios');

    Route::controller(PerfilUser::class)->prefix('perfil')->group(function () {
        Route::get('/', 'index')->name('user.perfil');
        Route::put('/', 'salvar')->name('user.perfil');
    });

    Route::controller(ConfiguracoesUser::class)->prefix('configuracoes')->group(function () {
        Route::get('/', 'index')->name('user.configuracoes');
        Route::put('/', 'salvar')->name('user.configuracoes');
        Route::put('/alterar-senha-padrao', 'alterarSenhaPadrao')->name('user.alterar-senha-padrao');
    });

    Route::get('/logout', [LoginUser::class, 'logout'])->name('logout.user');
});

/**
 * Fallback
 */
Route::fallback(function () {
    return redirect()->route('login.user');
});