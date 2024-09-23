<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login');
})->name('/');

Route::post('/login', function () {
    return redirect()->route('home');
})->name('login');

Route::get('/cadastrar', function () {
    return Inertia::render('Auth/Cadastrar');
})->name('cadastrar');

Route::post('/cadastrar', function () {
    return redirect()->route('home');
})->name('cadastrar');

Route::get('/home', function () {
    return Inertia::render('Dashboard/Home');
})->name('home');
