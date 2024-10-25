<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alimentos extends Model
{
    use HasFactory;
    protected $table = 'alimentos';
    protected $fillable = ['nome', 'calorias', 'proteinas', 'carboidratos', 'gorduras'];
}