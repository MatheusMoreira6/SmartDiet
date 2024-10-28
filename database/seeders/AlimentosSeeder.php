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
            ['nome' => 'Banana', 'tipo_alimento' => 'fruto'],
            ['nome' => 'Arroz Integral', 'tipo_alimento' => 'grão'],
            ['nome' => 'Frango Grelhado', 'tipo_alimento' => 'proteina_animal'],
            ['nome' => 'Ovo Cozido', 'tipo_alimento' => 'proteina_animal'],
            ['nome' => 'Batata Doce', 'tipo_alimento' => 'vegetal'],
            ['nome' => 'Maçã', 'tipo_alimento' => 'fruto'],
            ['nome' => 'Brócolis', 'tipo_alimento' => 'vegetal'],
            ['nome' => 'Quinoa', 'tipo_alimento' => 'grão'],
            ['nome' => 'Amêndoas', 'tipo_alimento' => 'oleaginosa'],
            ['nome' => 'Salmão', 'tipo_alimento' => 'proteina_animal'],
            ['nome' => 'Aveia', 'tipo_alimento' => 'grão'],
            ['nome' => 'Abacate', 'tipo_alimento' => 'fruto'],
            ['nome' => 'Iogurte Natural', 'tipo_alimento' => 'laticínio'],
            ['nome' => 'Cenoura', 'tipo_alimento' => 'vegetal'],
            ['nome' => 'Feijão Preto', 'tipo_alimento' => 'leguminosa'],
        ]);

        $alimentos = DB::table('alimentos')->get();

        DB::table('table_tipo_porcao')->insert([
            [
                'alimento_id' => $alimentos->where('nome', 'Banana')->first()->id,
                'nome_porcao' => '100g',
                'calorias' => 89.0,
                'proteinas' => 1.1,
                'carboidratos' => 22.8,
                'gorduras' => 0.3,
            ],
            [
                'alimento_id' => $alimentos->where('nome', 'Arroz Integral')->first()->id,
                'nome_porcao' => '100g',
                'calorias' => 111.0,
                'proteinas' => 2.6,
                'carboidratos' => 23.0,
                'gorduras' => 0.9,
            ],
            [
                'alimento_id' => $alimentos->where('nome', 'Frango Grelhado')->first()->id,
                'nome_porcao' => '100g',
                'calorias' => 239.0,
                'proteinas' => 27.3,
                'carboidratos' => 0.0,
                'gorduras' => 13.6,
            ],
            [
                'alimento_id' => $alimentos->where('nome', 'Ovo Cozido')->first()->id,
                'nome_porcao' => '100g',
                'calorias' => 155.0,
                'proteinas' => 13.0,
                'carboidratos' => 1.1,
                'gorduras' => 10.6,
            ],
            [
                'alimento_id' => $alimentos->where('nome', 'Batata Doce')->first()->id,
                'nome_porcao' => '100g',
                'calorias' => 86.0,
                'proteinas' => 1.6,
                'carboidratos' => 20.1,
                'gorduras' => 0.1,
            ],
            [
                'alimento_id' => $alimentos->where('nome', 'Maçã')->first()->id,
                'nome_porcao' => '100g',
                'calorias' => 52.0,
                'proteinas' => 0.3,
                'carboidratos' => 13.8,
                'gorduras' => 0.2,
            ],
            [
                'alimento_id' => $alimentos->where('nome', 'Brócolis')->first()->id,
                'nome_porcao' => '100g',
                'calorias' => 35.0,
                'proteinas' => 2.4,
                'carboidratos' => 7.2,
                'gorduras' => 0.4,
            ],
            [
                'alimento_id' => $alimentos->where('nome', 'Quinoa')->first()->id,
                'nome_porcao' => '100g',
                'calorias' => 120.0,
                'proteinas' => 4.4,
                'carboidratos' => 21.3,
                'gorduras' => 1.9,
            ],
            [
                'alimento_id' => $alimentos->where('nome', 'Amêndoas')->first()->id,
                'nome_porcao' => '100g',
                'calorias' => 575.0,
                'proteinas' => 21.2,
                'carboidratos' => 21.6,
                'gorduras' => 49.4,
            ],
            [
                'alimento_id' => $alimentos->where('nome', 'Salmão')->first()->id,
                'nome_porcao' => '100g',
                'calorias' => 206.0,
                'proteinas' => 22.1,
                'carboidratos' => 0.0,
                'gorduras' => 12.4,
            ],
            [
                'alimento_id' => $alimentos->where('nome', 'Aveia')->first()->id,
                'nome_porcao' => '100g',
                'calorias' => 389.0,
                'proteinas' => 16.9,
                'carboidratos' => 66.3,
                'gorduras' => 6.9,
            ],
            [
                'alimento_id' => $alimentos->where('nome', 'Abacate')->first()->id,
                'nome_porcao' => '100g',
                'calorias' => 160.0,
                'proteinas' => 2.0,
                'carboidratos' => 8.5,
                'gorduras' => 14.7,
            ],
            [
                'alimento_id' => $alimentos->where('nome', 'Iogurte Natural')->first()->id,
                'nome_porcao' => '100g',
                'calorias' => 61.0,
                'proteinas' => 3.5,
                'carboidratos' => 4.7,
                'gorduras' => 3.3,
            ],
            [
                'alimento_id' => $alimentos->where('nome', 'Cenoura')->first()->id,
                'nome_porcao' => '100g',
                'calorias' => 41.0,
                'proteinas' => 0.9,
                'carboidratos' => 9.6,
                'gorduras' => 0.2,
            ],
            [
                'alimento_id' => $alimentos->where('nome', 'Feijão Preto')->first()->id,
                'nome_porcao' => '100g',
                'calorias' => 132.0,
                'proteinas' => 8.9,
                'carboidratos' => 23.7,
                'gorduras' => 0.5,
            ],
        ]);
    }
}