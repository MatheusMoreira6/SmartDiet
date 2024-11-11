<?php

namespace Tests\Feature;

use App\Models\Alimento;
use App\Models\Dieta;
use App\Models\GrupoDieta;
use App\Models\HorarioDieta;
use App\Models\TipoPorcao;
use Database\Seeders\AlimentosSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class RefeicoesControllerTest extends TestCase
{
    use RefreshDatabase, WithoutMiddleware;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(AlimentosSeeder::class);
    }


    #[Test]
    public function test_busca_refeicoes(): void
    {
        $response = $this->get(route('admin.refeicoes', ['dia_id' => 1, 'dieta_id' => 1]));

        $response->assertStatus(200);
    }

    public function test_create_refeicap()
    {

        $alimento1 = Alimento::create(['nome' => 'Alimento 1', 'tipo_alimento' => 'fruto']);

        $porcao = TipoPorcao::create([
            'alimento_id' => $alimento1->id,
            'nome_porcao' => '100g',
            'calorias' => 89.0,
            'proteinas' => 1.1,
            'carboidratos' => 22.8,
            'gorduras' => 0.3,
        ]);


        $dieta = Dieta::factory()->create();
        $diaRefeicao = GrupoDieta::factory()->create(['dieta_id' => $dieta->id]);
        $horarioRefeicao = HorarioDieta::factory()->create(['grupo_id' => $diaRefeicao->id]);
        $response = $this->postJson(route('salvar.refeicao'), [
            'alimentos' => [
                ['id' =>  $alimento1->id, 'tipo_porcao' => ['id' => $porcao->id]]
            ],
            'dia' => $diaRefeicao->id,
            'horario' => $horarioRefeicao->id,
            'dieta_id' => $dieta->id,
        ]);



        $response->assertStatus(200);
        $this->assertDatabaseHas('refeicoes', [
            'dieta_id' => $dieta->id,
            'horario_id' => $horarioRefeicao->id,
            'dia_semana_id' => $diaRefeicao->id,
        ]);
        $this->assertDatabaseHas('alimento_refeicao', [
            'alimento_id' =>  $alimento1->id,
            'porcao_id' => $porcao->id
        ]);
    }

    public function test_edit_refeicao()
    {

        $this->seed();

        $dieta = Dieta::factory()->create();
        $diaRefeicao = GrupoDieta::factory()->create(['dieta_id' => $dieta->id]);

        $horarioRefeicao = HorarioDieta::factory()->create(['grupo_id' => $diaRefeicao->id]);

        $alimento1 = Alimento::create(['nome' => 'Alimento 1', 'tipo_alimento' => 'fruto']);
        $alimento2 = Alimento::create(['nome' => 'Alimento 2', 'tipo_alimento' => 'fruto']);

        $porcao = TipoPorcao::create([
            'alimento_id' => $alimento1->id,
            'nome_porcao' => '100g',
            'calorias' => 89.0,
            'proteinas' => 1.1,
            'carboidratos' => 22.8,
            'gorduras' => 0.3,
        ]);

        $porcao2 = TipoPorcao::create([
            'alimento_id' => $alimento2->id,
            'nome_porcao' => '100g',
            'calorias' => 89.0,
            'proteinas' => 1.1,
            'carboidratos' => 22.8,
            'gorduras' => 0.3,
        ]);

        $refeicaoId = DB::table('refeicoes')->insertGetId([
            'dieta_id' => $dieta->id,
            'horario_id' => $horarioRefeicao->id,
            'dia_semana_id' => $diaRefeicao->id,
            'id_ref_alt' => null,
        ]);

        $response = $this->postJson(route('editar.refeicao'), [
            'alimentos' => [
                ['id' => $alimento1->id, 'tipo_porcao' => ['id' => $porcao->id]],
                ['id' =>  $alimento2->id, 'tipo_porcao' => ['id' => $porcao2->id]],
            ],
            'dia' => $diaRefeicao->id,
            'horario' =>  $horarioRefeicao->id,
            'dieta_id' => $dieta->id,
            'id' => $refeicaoId,
        ]);


        $response->assertStatus(200);
        $this->assertDatabaseHas('alimento_refeicao', [
            'alimento_id' => $alimento1->id,
            'refeicao_id' => $refeicaoId,
            'porcao_id' => $porcao->id
        ]);
    }

    public function test_edit_horario()
    {
        $dieta = Dieta::factory()->create();
        $diaRefeicao = GrupoDieta::factory()->create(['dieta_id' => $dieta->id]);

        $horarioRefeicao = HorarioDieta::factory()->create(['grupo_id' => $diaRefeicao->id]);

        $response = $this->postJson(route('horario.editar'), [
            'id' => $horarioRefeicao->id,
            'horario' => '09:30',
            'dieta_id' =>  $dieta->id,
            'dia_id' => $diaRefeicao->id
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('table_horarios_dietas', [
            'horario' => '09:30',
        ]);
    }

    public function test_busca_horario(){
        $dieta = Dieta::factory()->create();
        $diaRefeicao = GrupoDieta::factory()->create(['dieta_id' => $dieta->id]);

        $horarioRefeicao = HorarioDieta::factory()->create(['grupo_id' => $diaRefeicao->id]);

        $response = $this->getJson(route('busca.horario.dia', ['dia_id' => $diaRefeicao->id, 'dieta_id' => $dieta->id]));
   
        $response->assertStatus(200);

        $this->assertDatabaseHas('table_horarios_dietas', [
            'horario' => $horarioRefeicao->horario,
        ]);
    }
}