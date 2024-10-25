<?php

namespace App\Http\Controllers;

use App\Models\Dietas;
use Illuminate\Http\Request;

class DietasController extends Controller
{
    public function salvar(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        Dietas::create($validated);

        return redirect()->route('dietas.index')->with('success', 'Dieta cadastrada com sucesso!');
    }
}