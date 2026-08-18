<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'statut',
    ];

    // Un ticket appartient à un client
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Un ticket contient plusieurs services, chacun avec une quantité
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'ticket_service')
            ->withPivot('quantite')
            ->withTimestamps();
    }
}
