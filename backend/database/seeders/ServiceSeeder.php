<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        Service::create([
            'libelle' => 'Lavage',
            'prix_unitaire' => 1000,
            'description' => 'Lavage standard au kg',
            'actif' => true,
        ]);

        Service::create([
            'libelle' => 'Repassage',
            'prix_unitaire' => 500,
            'description' => 'Repassage de chemises et pantalons',
            'actif' => true,
        ]);

        Service::create([
            'libelle' => 'Nettoyage à sec',
            'prix_unitaire' => 2000,
            'description' => 'Nettoyage à sec pour costumes et robes délicates',
            'actif' => true,
        ]);

        Service::create([
            'libelle' => 'Pressing express',
            'prix_unitaire' => 1500,
            'description' => 'Service rapide sous 24h',
            'actif' => true,
        ]);
    }
}
