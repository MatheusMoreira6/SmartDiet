<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Questionario extends Model
{
    use HasFactory;

    protected $fillable = ['nutricionista_id', 'titulo'];

    protected $hidden = ['nutricionista_id', 'created_at', 'updated_at'];

    public function nutricionista()
    {
        return $this->belongsTo(Nutricionista::class);
    }

    public function paciente()
    {
        return $this->hasMany(Paciente::class);
    }

    public function perguntas()
    {
        return $this->hasMany(Pergunta::class);
    }
}
