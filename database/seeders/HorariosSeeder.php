<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HorariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('horarios')->insert([
            [
                'id' => 1,
                'horario' => '08:00',
            ],
            [
                'id' => 2,
                'horario' => '12:00',
            ],
            [
                'id' => 3,
                'horario' => '15:00',
            ],
            [
                'id' => 4,
                'horario' => '18:00',
            ],
            [
                'id' => 5,
                'horario' => '21:00',
            ],
            
        ]);
    }
}