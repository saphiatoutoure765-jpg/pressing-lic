import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceApi } from '../../services/service';
import { ServiceModel } from '../../models/service-model';

@Component({
  selector: 'app-gestion-services',
  imports: [FormsModule],
  templateUrl: './gestion-services.html',
  styleUrl: './gestion-services.css',
})
export class GestionServices {
  private serviceApi = inject(ServiceApi);

  protected services = signal<ServiceModel[]>([]);
  protected message = '';

  // Formulaire (sert à la fois pour créer ET modifier)
  protected formulaire: ServiceModel = this.formulaireVide();
  protected enEdition = false;
  protected idEnEdition: number | null = null;

  ngOnInit(): void {
    this.charger();
  }

  private formulaireVide(): ServiceModel {
    return { libelle: '', prix_unitaire: 0, description: '', actif: true };
  }

  charger(): void {
    this.serviceApi.getAll().subscribe((data) => this.services.set(data));
  }

  ouvrirCreation(): void {
    this.enEdition = false;
    this.idEnEdition = null;
    this.formulaire = this.formulaireVide();
  }

  ouvrirEdition(service: ServiceModel): void {
    this.enEdition = true;
    this.idEnEdition = service.id!;
    this.formulaire = { ...service };
  }

  soumettre(): void {
    if (this.enEdition && this.idEnEdition) {
      this.serviceApi.update(this.idEnEdition, this.formulaire).subscribe({
        next: () => {
          this.message = 'Service modifié avec succès.';
          this.charger();
          this.ouvrirCreation();
          this.masquerMessage();
        },
        error: () => (this.message = 'Erreur lors de la modification.'),
      });
    } else {
      this.serviceApi.create(this.formulaire).subscribe({
        next: () => {
          this.message = 'Service créé avec succès.';
          this.charger();
          this.ouvrirCreation();
          this.masquerMessage();
        },
        error: () => (this.message = 'Erreur lors de la création.'),
      });
    }
  }

  archiver(service: ServiceModel): void {
    this.serviceApi.archiver(service.id!).subscribe(() => this.charger());
  }

  supprimer(service: ServiceModel): void {
    if (!confirm(`Supprimer définitivement "${service.libelle}" ?`)) return;
    this.serviceApi.delete(service.id!).subscribe(() => this.charger());
  }

  private masquerMessage(): void {
    setTimeout(() => (this.message = ''), 3000);
  }
}
