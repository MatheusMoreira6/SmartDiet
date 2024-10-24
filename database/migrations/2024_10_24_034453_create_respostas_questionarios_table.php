<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('respostas_questionarios', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pergunta_questionario_id');
            $table->string('resposta');
            $table->timestamps();

            $table->foreign('pergunta_questionario_id')->references('id')->on('perguntas_questionarios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('respostas_questionarios');
    }
};
