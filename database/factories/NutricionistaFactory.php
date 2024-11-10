<?php

namespace Database\Factories;

use App\Models\Nutricionista;
use App\Models\User;
use App\Models\Genero;
use Illuminate\Database\Eloquent\Factories\Factory;

class NutricionistaFactory extends Factory
{
    protected $model = Nutricionista::class;

    public function definition()
    {
        return [
            'user_id' => User::factory()->create()->id,
            'nome' => $this->faker->firstName,
            'sobrenome' => 'Pires',
            'data_nascimento' => $this->faker->date(),
            'genero_id' => Genero::factory()->create()->id,
            'cpf' => $this->faker->unique()->numerify('###.###.###-##'),
            'crn' => $this->faker->unique()->numerify('######'),
            'telefone' => '67998148523',
            'telefone_fixo' => '3131124',
        ];
    }
}