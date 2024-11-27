<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class ExameDefault extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $table = 'exames_default';

    protected $fillable = ['nome', 'unidade_medida', 'valor_referencia'];

    protected $hidden = ['created_at', 'updated_at'];
}
