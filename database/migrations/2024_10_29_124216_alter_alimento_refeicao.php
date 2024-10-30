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
        Schema::table('alimento_refeicao', function (Blueprint $table) {
            $table->foreignId('porcao_id')->constrained('table_tipo_porcao')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('alimento_refeicao', function (Blueprint $table) {
            $table->dropForeign(['porcao_id']);
        });
    }
};