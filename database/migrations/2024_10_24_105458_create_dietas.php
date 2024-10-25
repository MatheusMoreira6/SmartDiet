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
        Schema::create('dietas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('paciente_id');
            $table->unsignedBigInteger('nutricionista_id');
            $table->string('nome_dieta');
            $table->text('descricao')->nullable();
            $table->timestamps();
    
            $table->foreign('paciente_id')->references('id')->on('pacientes');
            $table->foreign('nutricionista_id')->references('id')->on('nutricionistas')->onDelete('cascade');
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dietas');
    }
};