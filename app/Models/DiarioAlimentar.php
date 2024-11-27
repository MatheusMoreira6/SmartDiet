<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class DiarioAlimentar extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $table = 'diario_alimentar';
    protected $fillable = ['id', 'paciente_id', 'imagem_refeicao', 'notas', 'data_refeicao'];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }
}
