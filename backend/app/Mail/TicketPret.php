<?php

namespace App\Mail;

use App\Models\Ticket;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TicketPret extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Ticket $ticket, public string $pdfContent)
    {
    }

    public function build()
    {
        return $this->subject('Votre commande #' . $this->ticket->id . ' est prête !')
            ->view('emails.ticket-pret')
            ->with(['ticket' => $this->ticket])
            ->attachData($this->pdfContent, 'recu-' . $this->ticket->id . '.pdf', [
                'mime' => 'application/pdf',
            ]);
    }
}
