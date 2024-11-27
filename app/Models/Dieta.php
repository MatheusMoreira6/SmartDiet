<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Dieta extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $table = 'dietas';
    protected $fillable = ["nome_dieta", "id", "nutricionista_id", "paciente_id", "descricao"];

    public function refeicoes()
    {
        return $this->hasMany(Refeicoes::class);
    }
}
