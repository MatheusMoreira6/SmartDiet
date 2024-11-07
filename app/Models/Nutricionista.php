<?php

namespace App\Models;

use DateInterval;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nutricionista extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nome',
        'sobrenome',
        'data_nascimento',
        'genero_id',
        'cpf',
        'crn',
        'telefone',
        'telefone_fixo'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function genero()
    {
        return $this->belongsTo(Genero::class);
    }

    public function pacientes()
    {
        return $this->hasMany(Paciente::class);
    }

    public function questionarios()
    {
        return $this->hasMany(Questionario::class);
    }

    public function exames()
    {
        return $this->hasMany(Exame::class);
    }

    public function pedidosExame()
    {
        return $this->hasMany(PedidoExame::class);
    }

    public function horarios()
    {
        return $this->hasMany(HorarioNutricionista::class);
    }

    public function consultas()
    {
        return $this->hasMany(AgendaConsulta::class);
    }

    public function diasAtendimento()
    {
        $horarios = $this->horarios()
            ->with('diaSemana:id,nome')
            ->orderBy('dia_semana_id')
            ->orderBy('inicio')
            ->orderBy('fim')
            ->get()->toArray();

        $diaSemanaAtendimento = [];

        foreach ($horarios as $horario) {
            $diaSemana = $horario['dia_semana'];

            if (!isset($diaSemanaAtendimento[$diaSemana['id']])) {
                $diaSemanaAtendimento[$diaSemana['id']] = [
                    'id' => $diaSemana['id'],
                    'descricao' => $diaSemana['nome'],
                ];
            }
        }

        ksort($diaSemanaAtendimento);

        return array_values($diaSemanaAtendimento);
    }

    public function datasAtendimento(int $diaSemanaId)
    {
        $horarios = $this->horarios()->where('dia_semana_id', $diaSemanaId)->get()->toArray();

        if (empty($horarios)) {
            return [];
        }

        $diaSemana = DiaSemana::find($diaSemanaId)->iso_8601;
        $datasAtendimento = [];

        $inicio = new DateTime();
        $fim = (clone $inicio)->modify("+30 days");

        while ($inicio <= $fim) {
            if ($inicio->format('N') == $diaSemana) {
                $datasAtendimento[] = [
                    'id' => $inicio->format('Y-m-d'),
                    'descricao' => $inicio->format('d/m/Y'),
                ];
            }

            $inicio->modify('+1 day');
        }

        return $datasAtendimento;
    }

    public function horariosAtendimento(string $dia)
    {
        $diaSemanaId = DiaSemana::where('iso_8601', (new DateTime($dia))->format('N'))->first()->id;
        $horarios = $this->horarios()->where('dia_semana_id', $diaSemanaId)->get()->toArray();

        if (empty($horarios)) {
            return [];
        }

        $horariosAtendimento = [];

        foreach ($horarios as $horario) {
            $inicio = new DateTime($dia . ' ' . $horario['inicio']);
            $fim = new DateTime($dia . ' ' . $horario['fim']);
            $duracaoConsulta = new DateInterval('PT' . (new DateTime($horario['duracao_consulta']))->format('H') . 'H' . (new DateTime($horario['duracao_consulta']))->format('i') . 'M');

            while ($inicio < $fim) {
                $horariosAtendimento[] = [
                    'id' => $inicio->format('H:i'),
                    'descricao' => $inicio->format('H:i'),
                ];

                $inicio->add($duracaoConsulta);
            }
        }

        return $horariosAtendimento;
    }
}
