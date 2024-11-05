<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\DiarioAlimentar;
use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DiariosAlimentares extends Controller
{

    public function index()
    {
        $user = Auth::user();

        $paciente = Paciente::where('user_id', $user->id)->firstOrFail();

        $fotosDiario = DiarioAlimentar::where('paciente_id', $paciente->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($foto) {
                $foto->foto_url = asset('storage/' . $foto->imagem_refeicao--);
                return $foto;
            });

        return $this->render('User/DiarioAlimentar/DiarioAlimentar', [
            'fotosDiario' => $fotosDiario,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'imagem_refeicao' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'notas' => 'nullable|string',
        ]);

        $paciente = Paciente::where('user_id', Auth::user()->id)->first();

        $path = $request->file('imagem_refeicao')->store('diarios_alimentares', 'public');

        DiarioAlimentar::create([
            'paciente_id' => $paciente->id,
            'imagem_refeicao' => $path,
            'notas' => $request->input('notas'),
            'data_refeicao' => now(),
        ]);

        $fotosDiario = DiarioAlimentar::where('paciente_id', $paciente->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($foto) {
                $foto->foto_url = asset('storage/' . $foto->imagem_refeicao--);
                return $foto;
            });

        response()->json(['fotos' => $fotosDiario]);
    }
}
