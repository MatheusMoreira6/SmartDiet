<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExamesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('exames_default')->insert([
            ['nome' => 'Hemograma completo', 'unidade_medida' => 'milhões/mm³'],
            ['nome' => 'Colesterol total', 'unidade_medida' => 'mg/dL'],
            ['nome' => 'Triglicerídeos', 'unidade_medida' => 'mg/dL'],
            ['nome' => 'Glicemia em jejum', 'unidade_medida' => 'mg/dL'],
            ['nome' => 'Hemoglobina glicada', 'unidade_medida' => '%'],
            ['nome' => 'Insulina', 'unidade_medida' => 'µU/mL'],
            ['nome' => 'TSH', 'unidade_medida' => 'µU/mL'],
            ['nome' => 'T4 Livre', 'unidade_medida' => 'ng/dL'],
            ['nome' => 'T3 Livre', 'unidade_medida' => 'pg/mL'],
            ['nome' => 'Ferro sérico', 'unidade_medida' => 'µg/dL'],
            ['nome' => 'Ferritina', 'unidade_medida' => 'ng/mL'],
            ['nome' => 'Transferrina', 'unidade_medida' => 'mg/dL'],
            ['nome' => 'Vitamina B12', 'unidade_medida' => 'pg/mL'],
            ['nome' => 'Vitamina C', 'unidade_medida' => 'mg/dL'],
            ['nome' => '25-hidroxi-vitamina D', 'unidade_medida' => 'ng/mL'],
            ['nome' => 'Cálcio total', 'unidade_medida' => 'mg/dL'],
            ['nome' => 'Sódio', 'unidade_medida' => 'mEq/L'],
            ['nome' => 'Potássio', 'unidade_medida' => 'mEq/L'],
        ]);
    }
}
