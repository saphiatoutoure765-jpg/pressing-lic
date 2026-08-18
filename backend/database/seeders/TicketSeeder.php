<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TicketSeeder extends Seeder
{
    public function run(): void
    {
        $client = User::create([
            'name' => 'Client Demo',
            'email' => 'demo@client.com',
            'password' => Hash::make('123456'),
            'role' => 'client',
        ]);

        $lavage = Service::where('libelle', 'Lavage')->first();
        $repassage = Service::where('libelle', 'Repassage')->first();

        $ticket1 = Ticket::create(['user_id' => $client->id, 'statut' => 'recu']);
        $ticket1->services()->attach($lavage->id, ['quantite' => 2]);

        $ticket2 = Ticket::create(['user_id' => $client->id, 'statut' => 'en_traitement']);
        $ticket2->services()->attach($repassage->id, ['quantite' => 3]);

        $ticket3 = Ticket::create(['user_id' => $client->id, 'statut' => 'pret']);
        $ticket3->services()->attach($lavage->id, ['quantite' => 1]);
        $ticket3->services()->attach($repassage->id, ['quantite' => 2]);
    }
}
