<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterCategoryPlaceTableAddRelationship extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        /*$cplinks = DB::select('SELECT category_id, place_id FROM category_place WHERE place_id NOT IN (SELECT GROUP_CONCAT(id) from places)');

        foreach ($cplinks as $cplink) {
            DB::delete('DELETE FROM category_place WHERE place_id = :pid AND category_id = :cid', [
                'pid' => $cplink->place_id,
                'cid' => $cplink->category_id
            ]);
        }*/

        Schema::table('category_place', function (Blueprint $table) {

            $table->unsignedBigInteger('category_id')->change();
            $table->unsignedBigInteger('place_id')->change();

            /*$table->unique(['category_id', 'place_id']);

            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onDelete('cascade');

            $table->foreign('place_id')
                ->references('id')
                ->on('places')
                ->onDelete('cascade');*/

        });
    }
}
