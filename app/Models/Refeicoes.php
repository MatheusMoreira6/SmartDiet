<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Refeicoes extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $table = 'refeicoes';
    protected $fillable = ['id', 'dieta_id', 'horario_id', 'dia_semana_id', 'id_ref_alt'];

    public function alimentos()
    {
        return $this->belongsToMany(Alimento::class, 'alimento_refeicao', 'refeicao_id', 'alimento_id')
            ->withPivot('porcao_id', 'gramas')
            ->with('tipoPorcao');
    }
}
