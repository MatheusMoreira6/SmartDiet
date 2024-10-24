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
        Schema::create('perguntas_questionarios', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('questionario_id');
            $table->string('pergunta');
            $table->timestamps();

            $table->foreign('questionario_id')->references('id')->on('questionarios')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perguntas_questionarios');
    }
};
