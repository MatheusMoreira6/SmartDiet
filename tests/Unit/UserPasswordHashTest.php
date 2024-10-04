<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserPasswordHashTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function test_password_hashes_user(): void
    {
        $user = User::create([
            'nome' => 'João Silva',
            'email' => 'joao@example.com',
            'password' => 'senha123',
            'administrador' => true,
        ]);

        // Verifica se a senha foi hashada corretamente
        $this->assertNotEquals('senha123', $user->password); // Verifica se a senha foi alterada
        $this->assertTrue(Hash::check('senha123', $user->password)); // Verifica se a senha bate com o hash
    }
}
