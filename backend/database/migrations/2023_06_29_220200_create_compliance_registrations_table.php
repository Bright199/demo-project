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
        Schema::create('compliance_registrations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->constrained('users')->onDelete('cascade');
            $table->string('company_name');
            $table->string('company_address');
            $table->string('date');
            $table->string('file');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compliance_registrations');
    }
};
