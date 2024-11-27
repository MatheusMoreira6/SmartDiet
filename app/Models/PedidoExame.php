<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class PedidoExame extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $table = 'pedidos_exames';

    protected $fillable = ['paciente_id', 'nutricionista_id', 'titulo_pedido', 'data_pedido', 'data_resultado'];

    protected $hidden = ['created_at', 'updated_at'];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }

    public function nutricionista()
    {
        return $this->belongsTo(Nutricionista::class);
    }

    public function itensPedidoExame()
    {
        return $this->hasMany(ItemPedidoExame::class);
    }
}
