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
        Schema::create('pacientes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();
            $table->unsignedBigInteger('nutricionista_id');
            $table->string('nome');
            $table->string('sobrenome');
            $table->date('data_nascimento');
            $table->unsignedBigInteger('genero_id');
            $table->string('cpf', 14)->unique();
            $table->string('telefone', 15);
            $table->string('foto_perfil')->nullable();
            $table->unsignedBigInteger('questionario_id')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('nutricionista_id')->references('id')->on('nutricionistas');
            $table->foreign('genero_id')->references('id')->on('generos');
            $table->foreign('questionario_id')->references('id')->on('questionarios');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pacientes');
    }
};
