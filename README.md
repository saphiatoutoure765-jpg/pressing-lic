# Pressing LIC — Application de gestion de pressing

Application web de gestion de commandes pour un pressing/laverie, développée avec **Laravel** (API REST) et **Angular** (SPA).

## Fonctionnalités

- Authentification par token (Laravel Sanctum) — client (auto-inscription) et gestionnaire (compte créé en base)
- Gestion des services (CRUD) par le gestionnaire
- Consultation du catalogue et dépôt de commandes (tickets) par le client, avec sélection de plusieurs services et quantités
- Suivi du cycle de statut d'un ticket : Reçu → En traitement → Prêt → Récupéré (+ Annulation possible avant "Prêt")
- Emails automatiques (confirmation de commande, notification gestionnaire, reçu prêt) via Mailtrap
- Génération d'un reçu PDF (DomPDF) envoyé par email lorsque le ticket passe au statut "Prêt"

## Stack technique

- **Backend** : Laravel 10, MySQL, Laravel Sanctum, Laravel Mail, DomPDF
- **Frontend** : Angular 22 (standalone components), Bootstrap 5
- **Environnement de test email** : Mailtrap

## Structure du projet
pressing-lic/
├── backend/ → API Laravel
└── frontend/ → Application Angular

## Installation

### Prérequis

- PHP 8.1+
- Composer
- Node.js 18+ et npm
- MySQL (ou Laragon, XAMPP, etc.)
- Angular CLI (`npm install -g @angular/cli`)

### 1. Backend (Laravel)

```bash
cd backend
composer install
copy .env.example .env
php artisan key:generate
```

Configurer le fichier `.env` :
- `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` selon votre configuration MySQL locale
- `MAIL_USERNAME`, `MAIL_PASSWORD` avec vos identifiants Mailtrap (créer un compte gratuit sur mailtrap.io)

Créer la base de données `pressing_lic` dans MySQL, puis :

```bash
php artisan migrate --seed
```

Cette commande crée les tables et insère des données de test :
- Un compte gestionnaire (`gestionnaire@pressing-lic.com` / `motdepasse123`)
- 4 services de démonstration
- Un client de démo (`demo@client.com` / `123456`) avec 3 tickets d'exemple

Lancer le serveur :

```bash
php artisan serve
```

L'API est accessible sur `http://127.0.0.1:8000/api`.

### 2. Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

L'application est accessible sur `http://localhost:4200`.

## Comptes de test

| Rôle | Email | Mot de passe |
|---|---|---|
| Gestionnaire | gestionnaire@pressing-lic.com | motdepasse123 |
| Client (démo) | demo@client.com | 123456 |

## Auteur

Safiatou Touré — Projet réalisé dans le cadre du cours Angular / Laravel (LIC).