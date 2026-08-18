import { Component, inject, signal } from '@angular/core';
import { TicketApi } from '../../services/ticket';
import { TicketModel } from '../../models/ticket-model';

@Component({
  selector: 'app-mes-commandes',
  imports: [],
  templateUrl: './mes-commandes.html',
  styleUrl: './mes-commandes.css',
})
export class MesCommandes {
  private ticketApi = inject(TicketApi);

  protected tickets = signal<TicketModel[]>([]);

  ngOnInit(): void {
    this.ticketApi.getAll().subscribe((data) => {
      this.tickets.set(data);
    });
  }

  libelleStatut(statut?: string): string {
    const labels: Record<string, string> = {
      recu: 'Reçu',
      en_traitement: 'En traitement',
      pret: 'Prêt',
      recupere: 'Récupéré',
      annule: 'Annulé',
    };
    return labels[statut ?? ''] ?? statut ?? '';
  }

  classeStatut(statut?: string): string {
    const classes: Record<string, string> = {
      recu: 'bg-secondary',
      en_traitement: 'bg-warning text-dark',
      pret: 'bg-success',
      recupere: 'bg-dark',
      annule: 'bg-danger',
    };
    return classes[statut ?? ''] ?? 'bg-secondary';
  }

  calculerTotal(ticket: TicketModel): number {
    return (ticket.services ?? []).reduce(
      (total, s) => total + s.prix_unitaire * s.pivot.quantite,
      0,
    );
  }
}
