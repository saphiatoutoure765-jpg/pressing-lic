<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'libelle',
        'prix_unitaire',
        'description',
        'actif',
    ];

    protected $casts = [
        'actif' => 'boolean',
        'prix_unitaire' => 'decimal:2',
    ];

    // Un service peut apparaître dans plusieurs tickets
    public function tickets(): BelongsToMany
    {
        return $this->belongsToMany(Ticket::class, 'ticket_service')
            ->withPivot('quantite')
            ->withTimestamps();
    }
}
