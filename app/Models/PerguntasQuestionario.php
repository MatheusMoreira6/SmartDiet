<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerguntasQuestionario extends Model
{
    use HasFactory;

    protected $fillable = ['questionario_id', 'pergunta'];

    public function questionario()
    {
        return $this->belongsTo(Questionario::class);
    }

    /**
     * Relacionamento com as respostas (uma pergunta tem muitas respostas).
     */
    public function respostas()
    {
        return $this->hasMany(RespostasQuestionario::class);
    }
}
