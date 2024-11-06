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
        Schema::create('table_horarios_dietas', function (Blueprint $table) {
            $table->id();
            $table->string('horario');
            $table->unsignedBigInteger('dieta_id');
            $table->unsignedBigInteger('grupo_id');
            $table->timestamps();

            $table->foreign('dieta_id')->references('id')->on('dietas')->onDelete('cascade');
            $table->foreign('grupo_id')->references('id')->on('table_grupo_dias_dieta')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_horarios_dietas');
    }
};