<?php

namespace Tests\Feature;

use App\Models\Alimento;
use App\Models\Dieta;
use App\Models\Paciente;
use App\Models\Refeicoes;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class BuscaDietaTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    #[Test]
    public function test_busca_dieta_paciente()
    {
        $paciente = Paciente::factory()->create();

        $dieta = Dieta::factory()->create([
            'paciente_id' => $paciente->id,
        ]);

        $refeicao = Refeicoes::factory()->create([
            'dieta_id' => $dieta->id,
        ]);

        $response = $this->getJson(route('dietas.buscar', ['id' => $paciente->id]));

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'dietas' => [
                [
                    'id',
                    'paciente_id',
                    'refeicoes' => [
                        [
                            'id',
                            'dieta_id',
                            'alimentos' => [
                                ['id', 'refeicao_id', 'nome', 'descricao']
                            ]
                        ]
                    ]
                ]
            ]
        ]);

        $this->assertEquals($paciente->id, $response->json('dietas')[0]['paciente_id']);
    }
}