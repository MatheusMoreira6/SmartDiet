<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestSendEmail extends Command
{
    protected $signature = 'email:test {email}'; // Adiciona um argumento para o e-mail
    protected $description = 'Envio de e-mail de teste';

    public function handle()
    {
        $email = $this->argument('email'); // Recebe o e-mail como argumento

        Mail::raw('Este é um e-mail de teste', function ($message) use ($email) {
            $message->to($email)
                    ->subject('E-mail de Teste');
        });

        $this->info('E-mail enviado para ' . $email);
    }
}