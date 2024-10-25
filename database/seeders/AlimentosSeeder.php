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
                'gorduras' => 0.3
            ],
            [
                'nome' => 'Arroz Integral',
                'calorias' => 123,
                'proteinas' => 2.7,
                'carboidratos' => 25.8,
                'gorduras' => 1.0
            ],
            [
                'nome' => 'Frango Grelhado',
                'calorias' => 165,
                'proteinas' => 31.0,
                'carboidratos' => 0,
                'gorduras' => 3.6
            ],
            [
                'nome' => 'Ovo Cozido',
                'calorias' => 155,
                'proteinas' => 13.0,
                'carboidratos' => 1.1,
                'gorduras' => 11.0
            ],
            [
                'nome' => 'Batata Doce',
                'calorias' => 86,
                'proteinas' => 1.6,
                'carboidratos' => 20.1,
                'gorduras' => 0.1
            ],
        ]);
    }
}
