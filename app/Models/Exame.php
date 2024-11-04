<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exame extends Model
{
    use HasFactory;

    protected $fillable = ['nutricionista_id', 'nome', 'unidade_medida', 'valor_referencia'];

    protected $hiiiden = ['nutricionista_id', 'created_at', 'updated_at'];

    public function nutricionista()
    {
        return $this->belongsTo(Nutricionista::class);
    }

    public function itensPedidosExames()
    {
        return $this->hasMany(ItemPedidoExame::class);
    }
}
