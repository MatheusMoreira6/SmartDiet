<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class UserLoginTest extends TestCase
{
    use RefreshDatabase, WithoutMiddleware;

    public function test_login_user_paciente(): void
    {
        // Cria um usuário com o campo 'nome' em vez de 'name'
        $user = User::create([
            'nome' => 'Maria Silva',
            'email' => 'maria@example.com',
            'password' => bcrypt('senha123'),
            'administrador' => false,
        ]);

        // Tenta realizar o login com as credenciais do usuário
        $response = $this->post('/user/login', [
            'email' => 'maria@example.com',
            'password' => 'senha123',
        ]);

        // Verifica se o login foi bem-sucedido e o usuário está autenticado
        $response->assertStatus(302); // Redireciona após login bem-sucedido
        $this->assertAuthenticatedAs($user); // Verifica se o usuário está autenticado
    }

    public function test_login_user_nutricionista()
    {
        // Cria um usuário com o campo 'nome' em vez de 'name'
        $user = User::create([
            'nome' => 'Maria Silva',
            'email' => 'maria@example.com',
            'password' => bcrypt('senha123'),
            'administrador' => true,
        ]);

        // Tenta realizar o login com as credenciais do usuário
        $response = $this->post('/admin/login', [
            'email' => 'maria@example.com',
            'password' => 'senha123',
        ]);

        // Verifica se o login foi bem-sucedido e o usuário está autenticado
        $response->assertStatus(302); // Redireciona após login bem-sucedido
        $this->assertAuthenticatedAs($user); // Verifica se o usuário está autenticado
    }
}