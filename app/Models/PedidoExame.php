<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidoExame extends Model
{
    use HasFactory;

    protected $fillable = ['paciente_id', 'nutricionista_id', 'data_pedido'];

    protected $hidden = ['created_at', 'updated_at'];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }

    public function exames()
    {
        return $this->belongsToMany(Exame::class, 'itens_pedido_exame', 'pedido_exame_id', 'exame_id');
    }
}
