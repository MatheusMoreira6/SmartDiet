<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exame extends Model
{
    use HasFactory;

    protected $fillable = ['nome', 'unidade_medida', 'valor_referencia'];

    protected $hiiiden = ['created_at', 'updated_at'];

    public function itensPedidosExames()
    {
        return $this->hasMany(ItemPedidoExame::class);
    }
}
