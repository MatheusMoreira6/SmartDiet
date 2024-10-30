<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alimento extends Model
{
    use HasFactory;
    protected $table = 'alimentos'; // Definindo a tabela caso não siga a convenção de nomenclatura

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
}