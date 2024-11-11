<?php

namespace Database\Factories;

use App\Models\Dieta;
use App\Models\GrupoDieta;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class HorarioDietaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'horario' => '08:00',
            'dieta_id' => Dieta::factory()->create()->id,
            'grupo_id' => GrupoDieta::factory()->create()->id
        ];
    }
}