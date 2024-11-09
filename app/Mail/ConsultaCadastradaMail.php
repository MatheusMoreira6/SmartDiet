<?php

namespace App\Mail;

use App\Models\AgendaConsulta;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ConsultaCadastradaMail extends Mailable
{
    use Queueable, SerializesModels;

    public $consulta;

    public function __construct(AgendaConsulta $consulta)
    {
        $this->consulta = $consulta;
    }

    public function build()
    {
        return $this->subject('Consulta Cadastrada com Sucesso')
            ->view('emails.consulta-cadastrada');
    }
}