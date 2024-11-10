<?php

namespace Tests\Feature;

use App\Models\Dieta;
use App\Models\GrupoDieta;
use App\Models\Paciente;
use App\Models\Nutricionista;
use App\Models\Refeicoes;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Support\Facades\DB;
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

    public function test_cadastro_grupo()
    {
        // Cria uma dieta e um nutricionista para relacionar com os dados da requisição
        $dieta = Dieta::factory()->create();
        $nutricionista = Nutricionista::factory()->create();
        $paciente = Paciente::factory()->create();

        // Dados para a requisição
        $requestData = [
            'ordem' => 1,
            'dieta_id' => $dieta->id,
            'horarios' => [
                ['horario' => '08:00'],
                ['horario' => '12:00']
            ],
            'grupos_dias' => [
                ['grupo_dia' => 'Grupo A'],
                ['grupo_dia' => 'Grupo B']
            ],
            'id_nutricionista' => $nutricionista->id,
            'id_paciente' => $paciente->id,
        ];

        // Faz a requisição POST
        $response = $this->postJson(route('add.grupo'), $requestData);

        // Verifica se a resposta está correta
        $response->assertStatus(200);

        // Verifica se os registros foram inseridos na tabela 'table_grupo_dias_dieta'
        foreach ($requestData['grupos_dias'] as $index => $grupo) {
            $this->assertDatabaseHas('table_grupo_dias_dieta', [
                'nome_grupo' => $grupo['grupo_dia'],
                'ordem' => $index + 1 + $requestData['ordem'],
                'dieta_id' => $requestData['dieta_id'],
            ]);
        }

        // Verifica se os registros foram inseridos na tabela 'table_horarios_dietas'
        $grupos_dias = DB::table('table_grupo_dias_dieta')->where('ordem', '>', $requestData['ordem'])->get();
        foreach ($grupos_dias as $grupo) {
            foreach ($requestData['horarios'] as $horario) {
                $this->assertDatabaseHas('table_horarios_dietas', [
                    'horario' => $horario['horario'],
                    'dieta_id' => $requestData['dieta_id'],
                    'grupo_id' => $grupo->id,
                ]);
            }
        }
    }

    public function test_delete_grupo()
    {
        $dieta = Dieta::factory()->create();
        $nutricionista = Nutricionista::factory()->create();
        $paciente = Paciente::factory()->create();

        $grupoDia = DB::table('table_grupo_dias_dieta')->insertGetId([
            'nome_grupo' => 'Grupo A',
            'ordem' => 1,
            'dieta_id' => $dieta->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $requestData = [
            'dieta_id' => $dieta->id,
            'dia_id' => $grupoDia,
            'id_nutricionista' => $nutricionista->id,
            'id_paciente' => $paciente->id,
        ];

        $response = $this->postJson(route('delete.grupo'), $requestData);

        $response->assertStatus(200);

        $this->assertDatabaseMissing('table_grupo_dias_dieta', [
            'id' => $grupoDia,
            'dieta_id' => $dieta->id,
        ]);
    }

    public function test_edita_dia()
    {
        $dieta = Dieta::factory()->create();
        $grupoDia = DB::table('table_grupo_dias_dieta')->insertGetId([
            'nome_grupo' => 'Grupo Original',
            'ordem' => 1,
            'dieta_id' => $dieta->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $requestData = [
            'grupo_dia' => $grupoDia,
            'newNome' => 'Grupo Editado'
        ];

        $response = $this->postJson(route('grupo_dia.editar'), $requestData);

        $response->assertStatus(200);

        $this->assertDatabaseHas('table_grupo_dias_dieta', [
            'id' => $grupoDia,
            'nome_grupo' => 'Grupo Editado',
        ]);

        $response->assertJson([
            'message' => 'Nome do grupo atualizado com sucesso!'
        ]);
    }

    public function test_busca_dias_horarios()
    {
        $dieta = Dieta::factory()->create();

        DB::table('table_grupo_dias_dieta')->insert([
            'nome_grupo' => 'Grupo 1',
            'ordem' => 1,
            'dieta_id' => $dieta->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('table_horarios_dietas')->insert([
            'horario' => '08:00',
            'dieta_id' => $dieta->id,
            'grupo_id' => GrupoDieta::factory()->create()->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->getJson(route('dias.horarios', ['id' => $dieta->id]));

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'dias' => [
                '*' => [
                    'id',
                    'nome_grupo',
                    'ordem',
                    'dieta_id',
                    'created_at',
                    'updated_at'
                ]
            ],
            'horarios' => [
                '*' => [
                    'id',
                    'horario',
                    'dieta_id',
                    'created_at',
                    'updated_at'
                ]
            ]
        ]);

        $response->assertJsonFragment(['nome_grupo' => 'Grupo 1']);
        $response->assertJsonFragment(['horario' => '08:00']);
    }
}
