<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HorarioNutricionista extends Model
{
    use HasFactory;

    protected $table = 'horarios_nutricionistas';

    protected $fillable = ['nutricionista_id', 'dia_semana_id', 'inicio', 'fim', 'duracao_consulta'];

    protected $hidden = ['nutricionista_id', 'created_at', 'updated_at'];

    public function diaSemana()
    {
        return $this->belongsTo(DiaSemana::class);
    }

    public function nutricionista()
    {
        return $this->belongsTo(Nutricionista::class);
    }
}
