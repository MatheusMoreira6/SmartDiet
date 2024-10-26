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
        Schema::table('refeicoes', function (Blueprint $table) {
            $table->unsignedBigInteger('horario_id')->nullable();
            $table->unsignedBigInteger('dia_semana_id')->nullable();

            $table->foreign('horario_id')->references('id')->on('horarios')->onDelete('cascade');
            $table->foreign('dia_semana_id')->references('id')->on('dias_semanas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('refeicoes', function (Blueprint $table) {
            $table->dropForeign(['horario_id']);
            $table->dropColumn('horario_id');
            $table->dropForeign(['dia_semana_id']);
            $table->dropColumn('dia_semana_id');
        });
    }
};