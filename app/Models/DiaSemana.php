<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class DiaSemana extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $table = 'dias_semana';

    protected $fillable = ['nome', 'ordem', 'iso_8601'];

    protected $hidden = ['created_at', 'updated_at'];

    public function horariosNutricionista()
    {
        return $this->hasMany(HorarioNutricionista::class);
    }
}
