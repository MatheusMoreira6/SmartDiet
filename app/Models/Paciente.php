<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nutricionista_id',
        'nome',
        'sobrenome',
        'data_nascimento',
        'genero_id',
        'cpf',
        'telefone'
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

    public function nutricionista()
    {
        return $this->belongsTo(Nutricionista::class);
    }
}
