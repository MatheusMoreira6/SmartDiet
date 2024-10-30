<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TipoPorcao extends Model
{
    use HasFactory;

    protected $table = 'table_tipo_porcao';
    protected $fillable = ['id', 'alimento_id', 'nome_porcao', 'calorias', 'proteinas', 'carboidratos', 'gorduras'];

    public function alimentos()
    {
        return $this->belongsTo(Alimento::class, 'alimento_id', 'id');
    }
}