<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dieta extends Model
{
    use HasFactory;
    protected $table = 'dietas';
    protected $fillable = ["nome_dieta", "id", "nutricionista_id", "paciente_id", "descricao"];

    public function refeicoes()
    {
        return $this->hasMany(Refeicoes::class);
    }
}