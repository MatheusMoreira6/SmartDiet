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
        Schema::create('questionarios', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('nutricionista_id');
            $table->string('titulo');
            $table->timestamps();

            $table->foreign('nutricionista_id')->references('id')->on('nutricionistas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questionarios');
    }
};
