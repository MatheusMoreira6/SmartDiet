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
        Schema::create('horarios_nutricionistas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('nutricionista_id');
            $table->unsignedBigInteger('dia_semana_id');
            $table->time('inicio');
            $table->time('fim');
            $table->time('duracao_consulta')->default('01:00:00');
            $table->timestamps();

            $table->foreign('nutricionista_id')->references('id')->on('nutricionistas')->onDelete('cascade');
            $table->foreign('dia_semana_id')->references('id')->on('dias_semana')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('horarios_nutricionistas');
    }
};
