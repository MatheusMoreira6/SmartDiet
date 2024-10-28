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
        Schema::create('table_tipo_porcao', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('alimento_id');
            $table->string('nome_porcao');
            $table->float('calorias', 8, 2);
            $table->float('proteinas', 8, 2);
            $table->float('carboidratos', 8, 2);
            $table->float('gorduras', 8, 2);
            $table->timestamps();

            $table->foreign('alimento_id')->references('id')->on('alimentos')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_tipo_porcao');
    }
};