<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

abstract class Controller
{
    /**
     * Renderiza um componente com as propriedades fornecidas.
     *
     * @param string $component O nome do componente a ser renderizado.
     * @param array $props Propriedades adicionais para passar ao componente.
     * @return \Inertia\Response
     */
    protected function render($component, $props = [])
    {
        $props = array_merge($props, session('props', []));

        return Inertia::render($component, array_merge($props, [
            'user' =>  Auth::user(),
            'currentRoute' => Route::currentRouteName(),
        ]));
    }

    /**
     * Redireciona para uma rota com as propriedades fornecidas.
     *
     * @param string $route O nome da rota para redirecionar.
     * @param array $props Propriedades adicionais para passar com o redirecionamento.
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function response($route, $props = [])
    {
        redirect()->route($route)->with('props', $props);
    }

    /**
     * Redireciona de volta com mensagens de erro.
     *
     * @param array $props Mensagens de erro para passar com o redirecionamento.
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function responseErrors($props = [])
    {
        redirect()->back()->withErrors($props);
    }
}
