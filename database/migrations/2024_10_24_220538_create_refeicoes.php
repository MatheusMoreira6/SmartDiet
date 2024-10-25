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
        Schema::create('refeicoes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('dieta_id');
            $table->string('nome_refeicao');
            $table->text('descricao')->nullable();
            $table->timestamps();
    
            $table->foreign('dieta_id')->references('id')->on('dietas')->onDelete('cascade');
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('refeicoes');
    }
};