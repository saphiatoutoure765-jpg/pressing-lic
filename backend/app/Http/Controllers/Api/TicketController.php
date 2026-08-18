<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\TicketPret;
use App\Mail\TicketRecu;
use App\Models\Ticket;
use App\Services\PdfService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class TicketController extends Controller
{
    public function __construct(protected PdfService $pdfService)
    {
    }

    // GET /api/tickets
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Ticket::with('services', 'user');

        if (! $user->isGestionnaire()) {
            $query->where('user_id', $user->id);
        }

        return response()->json($query->latest()->get());
    }

    // GET /api/tickets/{ticket}
    public function show(Request $request, Ticket $ticket)
    {
        $user = $request->user();

        if (! $user->isGestionnaire() && $ticket->user_id !== $user->id) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        return response()->json($ticket->load('services', 'user'));
    }

    // POST /api/tickets — dépôt de commande (client)
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'services' => 'required|array|min:1',
            'services.*.service_id' => 'required|exists:services,id',
            'services.*.quantite' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $ticket = Ticket::create([
            'user_id' => $request->user()->id,
            'statut' => 'recu',
        ]);

        foreach ($request->services as $item) {
            $ticket->services()->attach($item['service_id'], [
                'quantite' => $item['quantite'],
            ]);
        }

        $ticket->load('services', 'user');

        try {
            // Email de confirmation au client
            Mail::to($ticket->user->email)->send(new TicketRecu($ticket));

            // Notification au gestionnaire
            Mail::to(config('mail.from.address'))->send(new TicketRecu($ticket));
        } catch (\Exception $e) {
            logger()->error('Erreur envoi email ticket: ' . $e->getMessage());
        }

        return response()->json($ticket, 201);
    }

    // PATCH /api/tickets/{ticket}/statut
    public function changerStatut(Request $request, Ticket $ticket)
    {
        $validator = Validator::make($request->all(), [
            'statut' => 'required|in:en_traitement,pret,recupere',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $statutsAutorises = [
            'recu' => ['en_traitement'],
            'en_traitement' => ['pret'],
            'pret' => ['recupere'],
        ];

        $prochainsStatuts = $statutsAutorises[$ticket->statut] ?? [];

        if (! in_array($request->statut, $prochainsStatuts)) {
            return response()->json([
                'message' => "Impossible de passer de '{$ticket->statut}' à '{$request->statut}'",
            ], 422);
        }

        $ticket->update(['statut' => $request->statut]);
        $ticket->load('services', 'user');

        // Si le ticket passe à "Prêt" : email + PDF joint
        if ($request->statut === 'pret') {
            try {
                $pdfContent = $this->pdfService->genererRecu($ticket);
                Mail::to($ticket->user->email)->send(new TicketPret($ticket, $pdfContent));
            } catch (\Exception $e) {
                logger()->error('Erreur envoi email PDF: ' . $e->getMessage());
            }
        }

        return response()->json($ticket);
    }

    // PATCH /api/tickets/{ticket}/annuler
    public function annuler(Ticket $ticket)
    {
        if (in_array($ticket->statut, ['pret', 'recupere', 'annule'])) {
            return response()->json([
                'message' => 'Ce ticket ne peut plus être annulé à ce stade',
            ], 422);
        }

        $ticket->update(['statut' => 'annule']);

        return response()->json($ticket);
    }
}
