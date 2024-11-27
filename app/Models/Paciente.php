<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Paciente extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'user_id',
        'nutricionista_id',
        'nome',
        'sobrenome',
        'data_nascimento',
        'genero_id',
        'cpf',
        'telefone',
        'foto_perfil',
        'questionario_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function genero()
    {
        return $this->belongsTo(Genero::class);
    }

    public function nutricionista()
    {
        return $this->belongsTo(Nutricionista::class);
    }

    public function questionario()
    {
        return $this->belongsTo(Questionario::class);
    }

    public function respostas()
    {
        return $this->hasMany(Resposta::class);
    }

    public function pedidosExames()
    {
        return $this->hasMany(PedidoExame::class);
    }

    public function consultas()
    {
        return $this->hasMany(AgendaConsulta::class);
    }
}
