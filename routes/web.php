<?php

// Controllers Admin
use App\Http\Controllers\Admin\Dashboard as DashboardAdmin;
use App\Http\Controllers\Admin\Consultas as ConsultasAdmin;
use App\Http\Controllers\Admin\Exames as ExamesAdmin;
use App\Http\Controllers\Admin\Pacientes as PacientesAdmin;
use App\Http\Controllers\Admin\Questionarios as QuestionariosAdmin;
use App\Http\Controllers\Admin\Perfil as PerfilAdmin;
use App\Http\Controllers\Admin\Configuracoes as ConfiguracoesAdmin;
use App\Http\Controllers\Admin\Dietas as DietasAdmin;
use App\Http\Controllers\Admin\RefeicoesController;

// Controllers Auth
use App\Http\Controllers\Auth\CadastroAdmin as CadastroAdmin;
use App\Http\Controllers\Auth\LoginAdmin as LoginAdmin;
use App\Http\Controllers\Auth\LoginUser as LoginUser;
// Controllers User
use App\Http\Controllers\User\Dashboard as DashboardUser;
use App\Http\Controllers\User\Dietas as DietasUser;
use App\Http\Controllers\User\Consultas as ConsultasUser;
use App\Http\Controllers\User\Exames as ExamesUser;
use App\Http\Controllers\User\Questionario as QuestionarioUser;
use App\Http\Controllers\User\Perfil as PerfilUser;
use App\Http\Controllers\User\Configuracoes as ConfiguracoesUser;
use App\Http\Controllers\User\DiariosAlimentares;
// Middlewares
use App\Http\Middleware\CheckLogout;
use App\Http\Middleware\AuthenticateAdmin;
use App\Http\Middleware\AuthenticateUser;
use App\Http\Middleware\CheckQuestionarioUser;
use App\Models\DiarioAlimentar;
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

    Route::controller(ConsultasAdmin::class)->group(function () {
        Route::get('/consultas', 'index')->name('admin.consultas');
        Route::get('/consultas/show/{id}', 'show')->name('admin.consultas.show');
        Route::get('/consultas/data-atendimento/{id}', 'datasAtendimento')->name('admin.consultas.data-atendimento');
        Route::get('/consultas/horario-atendimento/{date}', 'horariosAtendimento')->name('admin.consultas.horario-atendimento');
        Route::post('/consultas/store', 'store')->name('admin.consultas.store');
        Route::post('/consultas/update', 'update')->name('admin.consultas.update');
        Route::post('/consultas/delete', 'delete')->name('admin.consultas.delete');
    });

    Route::controller(ExamesAdmin::class)->prefix('exames')->group(function () {
        Route::get('/', 'index')->name('admin.exames');
        Route::get('/edit/{id}', 'edit')->name('admin.exames.edit');
        Route::get('/show/{id}', 'show')->name('admin.exames.show');
        Route::post('/store', 'store')->name('admin.exames.store');
        Route::post('/update', 'update')->name('admin.exames.update');
        Route::post('/delete', 'delete')->name('admin.exames.delete');
    });

    Route::controller(QuestionariosAdmin::class)->prefix('questionarios')->group(function () {
        Route::get('/', 'index')->name('admin.questionarios');
        Route::get('/create', 'create')->name('admin.questionarios.create');
        Route::get('/edit/{id}', 'edit')->name('admin.questionarios.edit');
        Route::post('/store', 'store')->name('admin.questionarios.store');
        Route::post('/update', 'update')->name('admin.questionarios.update');
        Route::post('/delete', 'delete')->name('admin.questionarios.delete');
    });

    Route::controller(PerfilAdmin::class)->prefix('perfil')->group(function () {
        Route::get('/', 'index')->name('admin.perfil');
        Route::put('/', 'salvar')->name('admin.perfil');
    });

    Route::controller(ConfiguracoesAdmin::class)->prefix('configuracoes')->group(function () {
        Route::get('/', 'index')->name('admin.configuracoes');
        Route::get('/show-horario/{id}', 'showHorario')->name('admin.configuracoes.horario.show');
        Route::get('/show-exame/{id}', 'showExame')->name('admin.configuracoes.exames.show');
        Route::post('/update-seguranca', 'updateSeguranca')->name('admin.configuracoes.seguranca.update');
        Route::post('/update-horario', 'updateHorario')->name('admin.configuracoes.horario.update');
        Route::post('/delete-horario', 'deleteHorario')->name('admin.configuracoes.horario.delete');
        Route::post('/update-exame', 'updateExame')->name('admin.configuracoes.exames.update');
        Route::post('/delete-exame', 'deleteExame')->name('admin.configuracoes.exames.delete');
        Route::post('/import-exame', 'importExame')->name('admin.configuracoes.exames.import');
    });

    Route::controller(DietasAdmin::class)->group(function () {
        Route::post('/dietas', 'salvar')->name('dietas.salvar');
        Route::get('/busca-dias-horarios/{id}', 'buscaDiasHorarios')->name('dias.horarios');
        Route::get('/busca-alimentos', 'buscaAlimentos')->name('busca.alimentos');
        Route::get('/busca-dieta/{id}', 'buscaDieta')->name('busca.dieta');
        Route::post('/editar-dia', 'editaDia')->name('grupo_dia.editar');
    });

    Route::controller(RefeicoesController::class)->group(function () {
        Route::get('/busca-refeicoes/{dia_id}/{dieta_id}', 'buscaRefeicoes')->name('admin.refeicoes');
        Route::post('/salva-refeicao', 'salvarRefeicao')->name('salvar.refeicao');
        Route::post('/edita-refeicao', 'editarRefeicao')->name('editar.refeicao');
        Route::post('/editar-horario', 'editaHorario')->name('horario.editar');
        Route::get('/busca-horario/{dia_id}/{dieta_id}', 'buscaHorario')->name('busca.horario.dia');
    });

    Route::get('/logout', [LoginAdmin::class, 'logout'])->name('logout.admin');
});

// Rotas do painel de usuário
Route::middleware([AuthenticateUser::class])->prefix('user')->group(function () {

    Route::middleware([CheckQuestionarioUser::class])->group(function () {
        Route::get('/', [DashboardUser::class, 'index'])->name('user.home');
        Route::get('/dietas', [DietasUser::class, 'index'])->name('user.dietas');
        Route::get('/consultas', [ConsultasUser::class, 'index'])->name('user.consultas');
        Route::get('/exames', [ExamesUser::class, 'index'])->name('user.exames');
    });

    Route::controller(QuestionarioUser::class)->group(function () {
        Route::get('/questionario', 'index')->name('user.questionario');
        Route::post('/questionario', 'store')->name('user.questionario');
    });

    Route::controller(PerfilUser::class)->prefix('perfil')->group(function () {
        Route::get('/', 'index')->name('user.perfil');
        Route::put('/', 'salvar')->name('user.perfil');
    });

    Route::controller(ConfiguracoesUser::class)->prefix('configuracoes')->group(function () {
        Route::get('/', 'index')->name('user.configuracoes');
        Route::put('/', 'salvar')->name('user.configuracoes');
        Route::put('/alterar-senha-padrao', 'alterarSenhaPadrao')->name('user.alterar-senha-padrao');
    });

    Route::controller(DiariosAlimentares::class)->group(function () {
        Route::get('/diario-paciente', 'index')->name('diario.buscar');
        Route::post('/diario-postar', 'store')->name('diario.postar');
    });

    Route::get('/logout', [LoginUser::class, 'logout'])->name('logout.user');
});

/**
 * Fallback
 */
Route::fallback(function () {
    return redirect()->route('login.user');
});
