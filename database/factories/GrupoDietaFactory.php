<?php

namespace Database\Factories;

use App\Models\Dieta;
use App\Models\GrupoDieta;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class GruposDietaControllerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'horario' => 'Segunda/Quarta',
            'ordem' => 1,
            'dieta_id' => Dieta::factory()->create()->id,
            'grupo' => GrupoDieta::factory()->create()->id
        ];
    }
}
