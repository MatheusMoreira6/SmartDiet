<?php

namespace Tests\Feature;

use App\Models\Dieta;
use App\Models\Paciente;
use App\Models\Nutricionista;
use App\Models\Refeicoes;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class DietaControllerTest extends TestCase
{
    use RefreshDatabase, WithoutMiddleware;


    #[Test]
    public function test_create_dieta(): void
    {
        $paciente = Paciente::factory()->create();
        $nutricionista = Nutricionista::factory()->create();

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

        $response = $this->postJson(route('dietas.salvar'), $dietaData, [
            'X-CSRF-TOKEN' => csrf_token(),
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('dietas', [
            'nome_dieta' => 'Nome teste',
            'descricao' => '1232312',
            'paciente_id' => $paciente->id,
            'nutricionista_id' => $nutricionista->id,
        ]);

        foreach ($dietaData['horarios'] as $horario) {
            $this->assertDatabaseHas('table_horarios_dietas', ['horario' => $horario['horario']]);
        }

        foreach ($dietaData['grupos_dias'] as $grupo_dia) {
            $this->assertDatabaseHas('table_grupo_dias_dieta', ['nome_grupo' => $grupo_dia['grupo_dia']]);
        }
    }

    public function test_busca_dieta_paciente()
    {
        $paciente = Paciente::factory()->create();

        $dieta = Dieta::factory()->create([
            'paciente_id' => $paciente->id,
        ]);

        $response = $this->getJson(route('busca.dieta', ['id' => $paciente->id]));

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'dietas' => [
                [
                    'id',
                    'paciente_id',
                    'refeicoes' => []
                ]
            ]
        ]);

        $this->assertEquals($paciente->id, $response->json('dietas')[0]['paciente_id']);
    }
}
