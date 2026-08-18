<?php

namespace App\Mail;

use App\Models\Ticket;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TicketRecu extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Ticket $ticket)
    {
    }

    public function build()
    {
        return $this->subject('Confirmation de votre commande #' . $this->ticket->id)
            ->view('emails.ticket-recu')
            ->with(['ticket' => $this->ticket]);
    }
}
