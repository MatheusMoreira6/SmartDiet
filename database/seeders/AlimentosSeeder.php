<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AlimentosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('alimentos')->insert([
            [
                'nome' => 'Banana',
                'calorias' => 89,
                'proteinas' => 1.1,
                'carboidratos' => 22.8,
                'gorduras' => 0.3,
                'tipo_alimento' => 'fruto'
            ],
            [
                'nome' => 'Arroz Integral',
                'calorias' => 123,
                'proteinas' => 2.7,
                'carboidratos' => 25.8,
                'gorduras' => 1.0,
                'tipo_alimento' => 'grão'
            ],
            [
                'nome' => 'Frango Grelhado',
                'calorias' => 165,
                'proteinas' => 31.0,
                'carboidratos' => 0,
                'gorduras' => 3.6,
                'tipo_alimento' => 'proteina_animal'
            ],
            [
                'nome' => 'Ovo Cozido',
                'calorias' => 155,
                'proteinas' => 13.0,
                'carboidratos' => 1.1,
                'gorduras' => 11.0,
                'tipo_alimento' => 'proteina_animal'
            ],
            [
                'nome' => 'Batata Doce',
                'calorias' => 86,
                'proteinas' => 1.6,
                'carboidratos' => 20.1,
                'gorduras' => 0.1,
                'tipo_alimento' => 'vegetal'
            ],
            [
                'nome' => 'Maçã',
                'calorias' => 52,
                'proteinas' => 0.3,
                'carboidratos' => 13.8,
                'gorduras' => 0.2,
                'tipo_alimento' => 'fruto'
            ],
            [
                'nome' => 'Brócolis',
                'calorias' => 34,
                'proteinas' => 2.8,
                'carboidratos' => 6.6,
                'gorduras' => 0.4,
                'tipo_alimento' => 'vegetal'
            ],
            [
                'nome' => 'Quinoa',
                'calorias' => 120,
                'proteinas' => 4.1,
                'carboidratos' => 21.3,
                'gorduras' => 1.9,
                'tipo_alimento' => 'grão'
            ],
            [
                'nome' => 'Amêndoas',
                'calorias' => 579,
                'proteinas' => 21.2,
                'carboidratos' => 21.6,
                'gorduras' => 49.9,
                'tipo_alimento' => 'oleaginosa'
            ],
            [
                'nome' => 'Salmão',
                'calorias' => 208,
                'proteinas' => 20.0,
                'carboidratos' => 0,
                'gorduras' => 13.0,
                'tipo_alimento' => 'proteina_animal'
            ],
            [
                'nome' => 'Aveia',
                'calorias' => 389,
                'proteinas' => 16.9,
                'carboidratos' => 66.3,
                'gorduras' => 6.9,
                'tipo_alimento' => 'grão'
            ],
            [
                'nome' => 'Abacate',
                'calorias' => 160,
                'proteinas' => 2.0,
                'carboidratos' => 8.5,
                'gorduras' => 14.7,
                'tipo_alimento' => 'fruto'
            ],
            [
                'nome' => 'Iogurte Natural',
                'calorias' => 61,
                'proteinas' => 3.5,
                'carboidratos' => 4.7,
                'gorduras' => 3.3,
                'tipo_alimento' => 'laticínio'
            ],
            [
                'nome' => 'Cenoura',
                'calorias' => 41,
                'proteinas' => 0.9,
                'carboidratos' => 9.6,
                'gorduras' => 0.2,
                'tipo_alimento' => 'vegetal'
            ],
            [
                'nome' => 'Feijão Preto',
                'calorias' => 132,
                'proteinas' => 8.9,
                'carboidratos' => 23.7,
                'gorduras' => 0.5,
                'tipo_alimento' => 'leguminosa'
            ],
        ]);
    }
}