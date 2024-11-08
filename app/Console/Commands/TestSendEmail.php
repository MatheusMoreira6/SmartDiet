<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestSendEmail extends Command
{
    protected $signature = 'email:test';
    protected $description = 'Envia um e-mail de teste';

    public function handle()
    {
        Mail::raw('Este é um e-mail de teste enviado pelo Laravel usando SendGrid!', function ($message) {
            $message->to('thiagopiresdovalle@gmail.com') 
                    ->subject('Teste de Envio de E-mail');
        });

        $this->info('E-mail de teste enviado!');
    }
}