<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RespostasQuestionario extends Model
{
    use HasFactory;

    protected $fillable = ['pergunta_questionario_id', 'resposta'];

    public function pergunta()
    {
        return $this->belongsTo(PerguntasQuestionario::class);
    }
}
