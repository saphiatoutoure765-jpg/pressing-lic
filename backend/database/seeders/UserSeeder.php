<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Gestionnaire LIC',
            'email' => 'gestionnaire@pressing-lic.com',
            'password' => Hash::make('motdepasse123'),
            'role' => 'gestionnaire',
        ]);
    }
}
