<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resposta extends Model
{
    use HasFactory;

    protected $fillable = ['pergunta_id', 'paciente_id', 'resposta'];

    protected $hidden = ['pergunta_id', 'paciente_id', 'created_at', 'updated_at'];

    public function pergunta()
    {
        return $this->belongsTo(Pergunta::class);
    }

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }
}
