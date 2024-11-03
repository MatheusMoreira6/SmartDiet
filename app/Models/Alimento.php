<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alimento extends Model
{
    use HasFactory;
    protected $table = 'alimentos';

    protected $fillable = [
        'nome',
        'tipo_alimento',
    ];

    public function refeicoes()
    {
        return $this->belongsToMany(Refeicoes::class, 'alimento_refeicao');
    }

    public function tipoPorcao()
    {
        return $this->hasMany(TipoPorcao::class, 'alimento_id', 'id'); // Definindo o relacionamento
    }

    public function porcao()
    {
        return $this->belongsTo(Porcao::class, 'porcao_id');
    }
}