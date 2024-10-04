<?php

namespace Tests\Feature;

use App\Models\Nutricionista;
use App\Models\Paciente;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserCreateTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_user_paciente(): void
    {
        // Dados de exemplo para criação do usuário e paciente
        $userData = [
            'nome' => 'Maria Silva',
            'email' => 'maria@example.com',
            'password' => bcrypt('senha123'),
            'administrador' => false,
        ];

        $pacienteData = [
            'nome' => 'Maria Silva',
            'cpf' => '123.456.789-00',
            'telefone' => '(11) 99999-9999',
        ];

        // Cria o usuário
        $user = User::create($userData);

        // Cria o paciente vinculado ao usuário
        $paciente = Paciente::create(array_merge($pacienteData, ['user_id' => $user->id]));

        // Verifica se o usuário foi criado
        $this->assertDatabaseHas('users', [
            'email' => 'maria@example.com',
            'nome' => 'Maria Silva',
        ]);

        // Verifica se o paciente foi criado e vinculado corretamente
        $this->assertDatabaseHas('pacientes', [
            'nome' => 'Maria Silva',
            'cpf' => '123.456.789-00',
            'telefone' => '(11) 99999-9999',
            'user_id' => $user->id,
        ]);
    }

    public function test_create_user_nutricionista(): void
    {
        // Dados de exemplo para criação do usuário e nutricionista
        $userData = [
            'nome' => 'Carlos Silva',
            'email' => 'carlos@example.com',
            'password' => bcrypt('senha123'),
            'administrador' => true,
        ];

        $nutricionistaData = [
            'nome' => 'Carlos Silva',
            'cpf' => '987.654.321-00',
            'telefone' => '(11) 98888-8888',
        ];

        // Cria o usuário
        $user = User::create($userData);

        // Cria o nutricionista vinculado ao usuário
        $nutricionista = Nutricionista::create(array_merge($nutricionistaData, ['user_id' => $user->id]));

        // Verifica se o usuário foi criado
        $this->assertDatabaseHas('users', [
            'email' => 'carlos@example.com',
            'nome' => 'Carlos Silva',
        ]);

        // Verifica se o nutricionista foi criado e vinculado corretamente
        $this->assertDatabaseHas('nutricionistas', [
            'nome' => 'Carlos Silva',
            'cpf' => '987.654.321-00',
            'telefone' => '(11) 98888-8888',
            'user_id' => $user->id,
        ]);
    }
}
