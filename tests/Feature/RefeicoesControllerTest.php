<?php

namespace Tests\Feature;

use Database\Seeders\AlimentosSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\WithoutMiddleware;
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
}