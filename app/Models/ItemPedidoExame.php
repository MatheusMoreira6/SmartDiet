<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class ItemPedidoExame extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $table = 'itens_pedido_exame';

    protected $fillable = ['pedido_exame_id', 'exame_id'];

    protected $hidden = ['created_at', 'updated_at'];

    public function pedidoExame()
    {
        return $this->belongsTo(PedidoExame::class);
    }

    public function exame()
    {
        return $this->belongsTo(Exame::class);
    }
}
