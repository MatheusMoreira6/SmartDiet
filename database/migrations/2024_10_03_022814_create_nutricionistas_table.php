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
        Schema::create('nutricionistas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();
            $table->string('nome');
            $table->string('sobrenome');
            $table->date('data_nascimento');
            $table->unsignedBigInteger('genero_id');
            $table->string('cpf', 14)->unique();
            $table->string('crn', 8)->unique();
            $table->string('telefone', 15);
            $table->string('telefone_fixo', 9)->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('genero_id')->references('id')->on('generos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nutricionistas');
    }
};
