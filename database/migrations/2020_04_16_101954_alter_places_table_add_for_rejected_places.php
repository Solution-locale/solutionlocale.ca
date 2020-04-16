<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlacesTableAddForRejectedPlaces extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('places', function (Blueprint $table) {
            $table->boolean('rejection_id')->after('is_approved')->nullable();
        });

        Schema::create('rejections', function (Blueprint $table) {
            $table->id();
            $table->integer('place_id');
            $table->integer('user_id');
            $table->text('reason');
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
        Schema::table('places', function (Blueprint $table) {
            $table->dropColumn('is_rejected');
        });

        Schema::dropIfExists('rejections');
    }
}
