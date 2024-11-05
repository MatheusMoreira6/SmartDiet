<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiaSemana extends Model
{
    use HasFactory;

    protected $table = 'dias_semana';

    protected $fillable = ['nome'];

    protected $hidden = ['created_at', 'updated_at'];

    public function horariosNutricionista()
    {
        return $this->hasMany(HorarioNutricionista::class);
    }
}
