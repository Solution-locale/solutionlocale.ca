<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create(['name' => 'Jean-Philippe Murray', 'email' => 'curieuxmurray@gmail.com', 'password' => Hash::make('secret')]);
    }
}
