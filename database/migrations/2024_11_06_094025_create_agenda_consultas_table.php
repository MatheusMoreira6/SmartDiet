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
        Schema::create('agenda_consultas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('nutricionista_id');
            $table->unsignedBigInteger('paciente_id');
            $table->unsignedBigInteger('dia_semana_id');
            $table->date('data');
            $table->time('hora');
            $table->boolean('finalizada')->default(false);
            $table->decimal('peso', 5, 2)->nullable();
            $table->decimal('altura', 5, 2)->nullable();
            $table->decimal('imc', 5, 2)->nullable();
            $table->decimal('circunferencia_cintura', 5, 2)->nullable();
            $table->decimal('circunferencia_quadril', 5, 2)->nullable();
            $table->decimal('circunferencia_pescoco', 5, 2)->nullable();
            $table->decimal('percentual_gordura', 5, 2)->nullable();
            $table->decimal('massa_muscular', 5, 2)->nullable();
            $table->timestamps();

            $table->foreign('nutricionista_id')->references('id')->on('nutricionistas')->onDelete('cascade');
            $table->foreign('paciente_id')->references('id')->on('pacientes')->onDelete('cascade');
            $table->foreign('dia_semana_id')->references('id')->on('dias_semana')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agenda_consultas');
    }
};
