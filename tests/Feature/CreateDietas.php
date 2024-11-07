<?php

namespace Tests\Feature;

use App\Models\Paciente;
use App\Models\Nutricionista;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateDietas extends TestCase
{
    use RefreshDatabase;

    /**
     * Testa a criação de uma nova dieta.
     */
    public function test_create_dieta(): void
    {
        // Dados de setup para garantir que Paciente e Nutricionista existam
        $paciente = Paciente::factory()->create(['id' => 3]);
        $nutricionista = Nutricionista::factory()->create(['id' => 1]);

        // Dados da dieta para o teste
        $dietaData = [
            "nome" => "Nome teste",
            "descricao" => "1232312",
            "horarios" => [
                ["horario" => "08:00"],
                ["horario" => "12:00"]
            ],
            "grupos_dias" => [
                ["grupo_dia" => "Dias"]
            ],
            "id_paciente" => $paciente->id,
            "id_nutricionista" => $nutricionista->id
        ];

        $response = $this->postJson(route('dietas.salvar'), $dietaData);

        $response->assertStatus(200);

        $this->assertDatabaseHas('dietas', [
            'nome' => 'Nome teste',
            'descricao' => '1232312',
            'id_paciente' => $paciente->id,
            'id_nutricionista' => $nutricionista->id,
        ]);

        foreach ($dietaData['horarios'] as $horario) {
            $this->assertDatabaseHas('horarios', ['horario' => $horario['horario']]);
        }

        foreach ($dietaData['grupos_dias'] as $grupo_dia) {
            $this->assertDatabaseHas('grupos_dias', ['grupo_dia' => $grupo_dia['grupo_dia']]);
        }
    }
}