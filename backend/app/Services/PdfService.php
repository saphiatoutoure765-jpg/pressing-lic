<?php

namespace App\Services;

use App\Models\Ticket;
use Barryvdh\DomPDF\Facade\Pdf;

class PdfService
{
    public function genererRecu(Ticket $ticket): string
    {
        $pdf = Pdf::loadView('pdf.recu', ['ticket' => $ticket]);

        return $pdf->output();
    }
}
