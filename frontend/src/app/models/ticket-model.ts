import { ServiceModel } from './service-model';

export interface TicketServiceItem {
  service_id: number;
  quantite: number;
}

export interface TicketUser {
  id: number;
  name: string;
  email: string;
}

export interface TicketModel {
  id?: number;
  user_id?: number;
  user?: TicketUser;
  statut?: 'recu' | 'en_traitement' | 'pret' | 'recupere' | 'annule';
  services?: (ServiceModel & { pivot: { quantite: number } })[];
  created_at?: string;
}
