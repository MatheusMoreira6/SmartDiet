<?php

namespace Database\Factories;

use App\Models\Dieta;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class HorariosDietaControllerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome_grupo' => 'Segunda/Quarta',
            'ordem' => 1,
            'dieta_id' => Dieta::factory()->create()->id
        ];
    }
}
