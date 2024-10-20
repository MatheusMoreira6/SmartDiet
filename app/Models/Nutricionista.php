<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nutricionista extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nome',
        'sobrenome',
        'data_nascimento',
        'genero_id',
        'cpf',
        'crn',
        'telefone',
        'telefone_fixo'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function genero()
    {
        return $this->belongsTo(Genero::class);
    }

    public function pacientes()
    {
        return $this->hasMany(Paciente::class);
    }
}
