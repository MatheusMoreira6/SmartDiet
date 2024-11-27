<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Genero extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'descricao',
        'abrev'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function nutricionistas()
    {
        return $this->hasMany(Nutricionista::class);
    }

    public function pacientes()
    {
        return $this->hasMany(Paciente::class);
    }
}
