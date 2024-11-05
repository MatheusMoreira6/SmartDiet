<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExameDefault extends Model
{
    use HasFactory;

    protected $table = 'exames_default';

    protected $fillable = ['nome', 'unidade_medida', 'valor_referencia'];

    protected $hidden = ['created_at', 'updated_at'];
}
