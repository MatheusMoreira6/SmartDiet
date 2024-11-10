<?php

use App\Models\Paciente;
use App\Models\User;
use App\Models\Genero;
use App\Models\Nutricionista;
use App\Models\Questionario;
use Illuminate\Database\Eloquent\Factories\Factory;

class PacienteFactory extends Factory
{
    protected $model = Paciente::class;

    public function definition()
    {
        return [
            'user_id' => User::factory()->create()->id, // Cria um usuário e obtém o ID
            'nutricionista_id' => Nutricionista::factory()->create()->id, // Associa um nutricionista existente
            'nome' => $this->faker->firstName,
            'sobrenome' => $this->faker->lastName,
            'data_nascimento' => $this->faker->date(),
            'genero_id' => Genero::factory()->create()->id, // Cria um gênero e obtém o ID
            'cpf' => $this->faker->unique()->numerify('###.###.###-##'),
            'telefone' => $this->faker->phoneNumber,
            'questionario_id' => Questionario::factory()->optional()->create()->id, // Associa um questionário se existir
        ];
    }
}
