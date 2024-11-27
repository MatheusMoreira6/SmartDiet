<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class TipoPorcao extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $table = 'table_tipo_porcao';
    protected $fillable = ['id', 'alimento_id', 'nome_porcao', 'calorias', 'proteinas', 'carboidratos', 'gorduras'];

    public function alimentos()
    {
        return $this->belongsTo(Alimento::class, 'alimento_id', 'id');
    }
}
