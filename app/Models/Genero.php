<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genero extends Model
{
    use HasFactory;

    protected $fillable = [
        'descricao',
        'abrev'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function nutricionistas()
    {
        return $this->hasMany(Nutricionista::class);
    }

    public function pacientes()
    {
        return $this->hasMany(Paciente::class);
    }
}
