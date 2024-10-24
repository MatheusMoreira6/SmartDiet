<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Questionario extends Model
{
    use HasFactory;

    protected $fillable = ['nutricionista_id', 'titulo'];

    public function nutricionista()
    {
        return $this->belongsTo(Nutricionista::class);
    }

    public function perguntas()
    {
        return $this->hasMany(PerguntasQuestionario::class);
    }
}
