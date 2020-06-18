<?php

use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Schema;
use Solutionlocale\Commons\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ConvertUserRoles extends Migration
{
    /**
     * Updates existing users' roles
     *
     * @return void
     */
    public function up()
    {
        // Create new roles (it they don't exist)
        $existingRoles = Role::all()->pluck('name')->toArray();
        $roles = ['user', 'admin', 'moderator', 'super_admin'];

        $newRoles = array_diff($roles, $existingRoles);

        foreach ($newRoles as $name) {
            Role::create(['name' => $name]);
        }

        // Convert users' roles
        $users = User::all();

        foreach ($users as $user) {
            $user->assignRole([
                $user->is_admin ? 'admin' : null,
                $user->is_moderator ? 'moderator' : null,
                $user->is_super_admin ? 'super_admin' : null,
            ]);
        }

        // Drop old roles columns
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_admin');
            $table->dropColumn('is_moderator');
            $table->dropColumn('is_super_admin');
        });
    }

    /**
     * Reverts existing users' roles
     *
     * @return void
     */
    public function down()
    {
        // Add back old roles
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_moderator')->default(false)->after('password');
            $table->boolean('is_admin')->default(false)->after('is_moderator');
            $table->boolean('is_super_admin')->default(false)->after('is_admin');
        });

        // Convert back users' roles
        $users = User::all();

        foreach ($users as $user) {
            $user->is_admin = $user->hasRole('admin');
            $user->is_moderator = $user->hasRole('moderator');
            $user->is_super_admin = $user->hasRole('super_admin');

            $user->save();
        }

        // Drop new roles
        Role::whereIn('name', ['admin', 'moderator', 'super_admin'])->delete();
    }
}
