<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Basic roles are created in 2020_03_30_184959_convert_user_roles.php migration
        /** @var Role */
        $adminRole = Role::findByName('admin');
        /** @var Role */
        $moderatorRole = Role::findByName('moderator');

        // Create permissions
        $administrationPermission = Permission::create(['name' => 'do-admin']);
        $moderationPermission = Permission::create(['name' => 'do-moderation']);

        // Assign permissions to roles
        $adminRole->givePermissionTo([$administrationPermission, $moderationPermission]);
        $moderatorRole->givePermissionTo([$moderationPermission]);
    }
}
