<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EventRecord extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->integer('heart_rate_BPM');
            $table->dateTime('date');
            $table->foreignId('patient_id')->references('id')->on('users')->onUpdate('cascade');
            $table->timestamps();
            $table->unique(["type", "date","patient_id"], 'unique_eventtype_date_PID');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event');
    }
}
