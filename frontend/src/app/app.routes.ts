import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Catalogue } from './pages/catalogue/catalogue';
import { MesCommandes } from './pages/mes-commandes/mes-commandes';
import { GestionServices } from './pages/gestion-services/gestion-services';
import { GestionTickets } from './pages/gestion-tickets/gestion-tickets';
import { authGuard } from './guards/auth-guard';
import { gestionnaireGuard } from './guards/gestionnaire-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'catalogue', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'catalogue', component: Catalogue, canActivate: [authGuard] },
  { path: 'mes-commandes', component: MesCommandes, canActivate: [authGuard] },
  { path: 'gestion-services', component: GestionServices, canActivate: [gestionnaireGuard] },
  { path: 'gestion-tickets', component: GestionTickets, canActivate: [gestionnaireGuard] },
  { path: '**', redirectTo: 'catalogue' },
];
