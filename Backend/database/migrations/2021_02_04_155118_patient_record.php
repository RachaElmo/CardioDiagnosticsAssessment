<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PatientRecord extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->unique()->references('id')->on('users')->onUpdate('cascade');
            $table->string('name');
            $table->date('date_of_birth');
            $table->dateTime('study_start_time');
            $table->dateTime('study_end_time');
            $table->foreignId('device_id')->references('id')->on('device')->onUpdate('cascade')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patient');
    }
}
