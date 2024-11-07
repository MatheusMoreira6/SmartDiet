<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DiasSemanaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('dias_semana')->insert([
            ['nome' => 'Domingo', 'ordem' => 1, 'iso_8601' => 7],
            ['nome' => 'Segunda-feira', 'ordem' => 2, 'iso_8601' => 1],
            ['nome' => 'Terça-feira', 'ordem' => 3, 'iso_8601' => 2],
            ['nome' => 'Quarta-feira', 'ordem' => 4, 'iso_8601' => 3],
            ['nome' => 'Quinta-feira', 'ordem' => 5, 'iso_8601' => 4],
            ['nome' => 'Sexta-feira', 'ordem' => 6, 'iso_8601' => 5],
            ['nome' => 'Sábado', 'ordem' => 7, 'iso_8601' => 6],
        ]);
    }
}
