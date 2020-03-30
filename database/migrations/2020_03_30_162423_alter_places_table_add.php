<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterPlacesTableAdd extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('places', function (Blueprint $table) {
            $table->string('address_2')->after('address')->nullable();
            $table->decimal('long', 10, 7)->nullable()->change();
            $table->decimal('lat', 10, 7)->nullable()->change();
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
            $table->dropColumn('address_2');
            $table->decimal('long', 10, 7)->change();
            $table->decimal('lat', 10, 7)->change();
        });
    }
}
