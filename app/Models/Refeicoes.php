<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Refeicoes extends Model
{
    use HasFactory;
    protected $table = 'refeicoes';
    protected $fillable = ['id', 'dieta_id', 'horario_id', 'dia_semana_id'];

    public function alimentos()
    {
        return $this->belongsToMany(Alimento::class, 'alimento_refeicao', 'refeicao_id', 'alimento_id');
    }
}