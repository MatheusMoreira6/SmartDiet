<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DiasSemanasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('dias_semanas')->insert([
            [
                'id' => 1,
                'dia' => 'Segunda',
            ],
            [
                'id' => 2,
                'dia' => 'Terça',
            ],
            [
                'id' => 3,
                'dia' => 'Quarta',
            ],
            [
                'id' => 4,
                'dia' => 'quinta',
            ],
            [
                'id' => 5,
                'dia' => 'Sexta',
            ],
            [
                'id' => 6,
                'dia' => 'Quarta',
            ],
            [
                'id' => 7,
                'dia' => 'Domingo',
            ]
        ]);
    }
}