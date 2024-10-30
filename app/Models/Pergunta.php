<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pergunta extends Model
{
    use HasFactory;

    protected $fillable = ['questionario_id', 'pergunta'];

    protected $hidden = ['questionario_id', 'created_at', 'updated_at'];

    public function questionario()
    {
        return $this->belongsTo(Questionario::class);
    }

    /**
     * Relacionamento com as respostas (uma pergunta tem muitas respostas).
     */
    public function respostas()
    {
        return $this->hasMany(Resposta::class);
    }
}
