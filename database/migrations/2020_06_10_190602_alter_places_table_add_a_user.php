<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlacesTableAddAUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('places', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->after('id')->nullable();
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
            $table->dropColumn('user_id');
        });
    }
}
