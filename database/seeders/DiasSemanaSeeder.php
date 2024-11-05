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
            ['nome' => 'Domingo', 'ordem' => 1],
            ['nome' => 'Segunda-feira', 'ordem' => 2],
            ['nome' => 'Terça-feira', 'ordem' => 3],
            ['nome' => 'Quarta-feira', 'ordem' => 4],
            ['nome' => 'Quinta-feira', 'ordem' => 5],
            ['nome' => 'Sexta-feira', 'ordem' => 6],
            ['nome' => 'Sábado', 'ordem' => 7],
        ]);
    }
}
