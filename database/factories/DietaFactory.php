<?php

namespace Database\Factories;

use App\Models\Nutricionista;
use App\Models\Paciente;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dieta>
 */
class DietaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome_dieta' => 'Nome teste',
            'descricao' => '1232312',
            'paciente_id' => Paciente::factory()->create()->id,
            'nutricionista_id' => Nutricionista::factory()->create()->id,
        ];
    }
}