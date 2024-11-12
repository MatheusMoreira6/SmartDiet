<?php

namespace App\Mail;

use App\Models\AgendaConsulta;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ConsultaDesmarcada extends Mailable
{
    use Queueable, SerializesModels;

    public $consulta;

    public function __construct(AgendaConsulta $consulta)
    {
        $this->consulta = $consulta;
    }

    public function build()
    {
        return $this->subject('Consulta Desmarcada com Sucesso')
            ->view('emails.consulta-desmarcada');
    }
}