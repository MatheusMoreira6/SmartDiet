<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgendaConsulta extends Model
{
    use HasFactory;

    protected $fillable = [
        'nutricionista_id',
        'paciente_id',
        'dia_semana_id',
        'data',
        'hora',
        'finalizada',
        'peso',
        'altura',
        'imc',
        'circunferencia_cintura',
        'circunferencia_quadril',
        'circunferencia_pescoco',
        'percentual_gordura',
        'massa_muscular'
    ];

    protected $hidden = [
        'nutricionista_id',
        'created_at',
        'updated_at',
    ];

    public function nutricionista()
    {
        return $this->belongsTo(Nutricionista::class);
    }

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }

    public function diaSemana()
    {
        return $this->belongsTo(DiaSemana::class);
    }
}
