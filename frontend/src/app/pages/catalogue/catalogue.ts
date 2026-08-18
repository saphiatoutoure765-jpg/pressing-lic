import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceApi } from '../../services/service';
import { ServiceModel } from '../../models/service-model';
import { TicketApi } from '../../services/ticket';

@Component({
  selector: 'app-catalogue',
  imports: [FormsModule],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css',
})
export class Catalogue {
  private serviceApi = inject(ServiceApi);
  private ticketApi = inject(TicketApi);

  protected services = signal<ServiceModel[]>([]);
  protected recherche = '';
  protected panier = signal<{ service_id: number; libelle: string; quantite: number }[]>([]);
  protected message = '';

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.serviceApi.getAll(this.recherche || undefined).subscribe((data) => {
      this.services.set(data);
    });
  }

  ajouterAuPanier(service: ServiceModel): void {
    const panierActuel = this.panier();
    const existant = panierActuel.find((p) => p.service_id === service.id);

    if (existant) {
      existant.quantite++;
      this.panier.set([...panierActuel]);
    } else {
      this.panier.set([
        ...panierActuel,
        { service_id: service.id!, libelle: service.libelle, quantite: 1 },
      ]);
    }
  }

  retirerDuPanier(serviceId: number): void {
    this.panier.set(this.panier().filter((p) => p.service_id !== serviceId));
  }

  deposerCommande(): void {
    if (this.panier().length === 0) return;

    const payload = {
      services: this.panier().map((p) => ({
        service_id: p.service_id,
        quantite: p.quantite,
      })),
    };

    this.ticketApi.create(payload).subscribe({
      next: () => {
        this.message = 'Commande déposée avec succès !';
        this.panier.set([]);
        setTimeout(() => (this.message = ''), 3000);
      },
      error: () => {
        this.message = 'Erreur lors du dépôt de la commande.';
      },
    });
  }
}
