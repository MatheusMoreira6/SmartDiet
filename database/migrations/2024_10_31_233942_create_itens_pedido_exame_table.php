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
        Schema::create('itens_pedido_exame', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pedido_exame_id');
            $table->unsignedBigInteger('exame_id');
            $table->string('resultado')->nullable();
            $table->timestamps();

            $table->foreign('pedido_exame_id')->references('id')->on('pedidos_exames')->onDelete('cascade');
            $table->foreign('exame_id')->references('id')->on('exames')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('itens_pedido_exame');
    }
};
