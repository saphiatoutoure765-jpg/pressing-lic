import { Component, inject, signal } from '@angular/core';
import { TicketApi } from '../../services/ticket';
import { TicketModel } from '../../models/ticket-model';

@Component({
  selector: 'app-gestion-tickets',
  imports: [],
  templateUrl: './gestion-tickets.html',
  styleUrl: './gestion-tickets.css',
})
export class GestionTickets {
  private ticketApi = inject(TicketApi);

  protected tickets = signal<TicketModel[]>([]);
  protected message = '';

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.ticketApi.getAll().subscribe((data) => this.tickets.set(data));
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

  // Le prochain statut possible selon le statut actuel (respecte le cycle)
  prochainStatut(statut?: string): string | null {
    const suite: Record<string, string> = {
      recu: 'en_traitement',
      en_traitement: 'pret',
      pret: 'recupere',
    };
    return suite[statut ?? ''] ?? null;
  }

  libelleAction(statut?: string): string {
    const actions: Record<string, string> = {
      recu: 'Passer en traitement',
      en_traitement: 'Marquer prêt',
      pret: 'Marquer récupéré',
    };
    return actions[statut ?? ''] ?? '';
  }

  changerStatut(ticket: TicketModel): void {
    const prochain = this.prochainStatut(ticket.statut);
    if (!prochain) return;

    this.ticketApi.changerStatut(ticket.id!, prochain).subscribe({
      next: () => {
        this.message = 'Statut mis à jour.';
        this.charger();
        setTimeout(() => (this.message = ''), 3000);
      },
      error: () => (this.message = 'Erreur lors du changement de statut.'),
    });
  }

  annuler(ticket: TicketModel): void {
    if (!confirm(`Annuler la commande #${ticket.id} ?`)) return;

    this.ticketApi.annuler(ticket.id!).subscribe({
      next: () => {
        this.charger();
      },
      error: () => (this.message = "Erreur lors de l'annulation."),
    });
  }

  peutAnnuler(statut?: string): boolean {
    return statut === 'recu' || statut === 'en_traitement';
  }

  calculerTotal(ticket: TicketModel): number {
    return (ticket.services ?? []).reduce(
      (total, s) => total + s.prix_unitaire * s.pivot.quantite,
      0,
    );
  }
}
