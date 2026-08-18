<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TicketController;
use Illuminate\Support\Facades\Route;

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{service}', [ServiceController::class, 'show']);

// Routes protégées (utilisateur connecté)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Tickets : accessibles au client (ses tickets) ET au gestionnaire (tous)
    Route::get('/tickets', [TicketController::class, 'index']);
    Route::get('/tickets/{ticket}', [TicketController::class, 'show']);
    Route::post('/tickets', [TicketController::class, 'store']);

    // Routes réservées au gestionnaire
    Route::middleware('gestionnaire')->group(function () {
        Route::post('/services', [ServiceController::class, 'store']);
        Route::put('/services/{service}', [ServiceController::class, 'update']);
        Route::delete('/services/{service}', [ServiceController::class, 'destroy']);
        Route::patch('/services/{service}/archiver', [ServiceController::class, 'archiver']);

        Route::patch('/tickets/{ticket}/statut', [TicketController::class, 'changerStatut']);
        Route::patch('/tickets/{ticket}/annuler', [TicketController::class, 'annuler']);
    });
});
