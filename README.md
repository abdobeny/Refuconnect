# RefuConnect

Plateforme de gestion pour refuge animalier — **Laravel** (backend + Filament admin) + **React** (frontend).

## Architecture

```
backend/          Laravel 11 API + Filament admin panel (http://127.0.0.1:8000)
frontend/         React 19 + Vite SPA (http://localhost:5173)
```

- **Public site**: React SPA — adoption, toilettage, couplage, dons, bénévolat
- **Admin panel**: Filament — gestion complète des animaux, demandes, utilisateurs
- **User dashboard**: React — suivi des adoptions, dons, réservations

## Prérequis

- PHP 8.2+
- Composer
- Node.js 18+ et npm
- MySQL (ou SQLite pour le développement)

## Installation

### Backend

```bash
cd backend

# 1. Copier la configuration
cp .env.example .env

# 2. Installer les dépendances
composer install

# 3. Générer la clé d'application
php artisan key:generate

# 4. Configurer la base de données dans .env
#    Par défaut : MySQL (DB_CONNECTION=mysql)
#    Pour SQLite : DB_CONNECTION=sqlite

# 5. Migrer et peupler la base
php artisan migrate:fresh --seed

# 6. Lancer le serveur
php artisan serve
```

### Frontend

```bash
cd frontend

# 1. Installer les dépendances
npm install

# 2. Copier la configuration (optionnel — les valeurs par défaut fonctionnent)
cp .env.example .env

# 3. Lancer le serveur de développement
npm run dev
```

### Accéder à l'application

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://127.0.0.1:8000/api |
| Admin (Filament) | http://127.0.0.1:8000/admin |

## Identifiants de test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | `admin@refuconnect.com` | `admin123` |
| Utilisateur | `jean@example.com` | `password123` |

10 utilisateurs de test sont créés par le seeder (`jean@example.com` à `claire@example.com`).

## Commandes utiles

### Backend

```bash
php artisan migrate:fresh --seed   # Réinitialiser la base de données
php artisan optimize:clear         # Vider le cache (config, routes, vues)
php artisan config:cache           # Mettre en cache la configuration
php artisan route:cache            # Mettre en cache les routes
php artisan view:cache             # Mettre en cache les vues
```

### Frontend

```bash
npm run dev       # Serveur de développement
npm run build     # Build de production
npm run preview   # Prévisualiser le build
npm run lint      # Vérifier le code
```

## Dépannage

### "Headers already sent" ou erreur PHP au chargement

```bash
cd backend
php artisan optimize:clear
```

### Le dashboard Filament est lent

- En développement, Vite recompile le CSS à chaque requête — c'est normal
- Les statistiques du dashboard sont mises en cache 60 secondes
- En production, lancez `php artisan optimize` pour tout mettre en cache

### Erreur de connexion MySQL

1. Vérifiez que MySQL est en cours d'exécution
2. Créez la base de données : `CREATE DATABASE refuconnect;`
3. Vérifiez les identifiants dans `backend/.env`
4. Pour utiliser SQLite à la place, modifiez `DB_CONNECTION=sqlite` dans `.env`

### Le frontend ne se connecte pas au backend

- Vérifiez que le backend tourne sur `http://127.0.0.1:8000`
- Le frontend utilise le proxy Vite (`VITE_API_URL=/api`) en développement
- En production, configurez `VITE_API_ORIGIN` dans `frontend/.env`

### Les données ne s'affichent pas

```bash
cd backend
php artisan migrate:fresh --seed
```

## Flux d'authentification

1. L'utilisateur se connecte via le frontend React (`/connexion`)
2. Le frontend appelle `POST /api/login` → reçoit un token Sanctum
3. Le token est stocké en localStorage
4. Chaque requête API inclut `Authorization: Bearer <token>`
5. L'admin accède à Filament via le lien "Voir le site" → pont de session

## Fonctionnalités

- **Animaux** : CRUD complet, filtrage par statut/espèce, photos
- **Adoptions** : Formulaire public, validation admin, mise à jour automatique du statut
- **Toilettage** : Réservation avec date/heure, confirmation admin
- **Couplage** : Demandes de mise en relation, gestion des tarifs
- **Dons** : Dons financiers et matériels, suivi des statuts
- **Bénévolat** : Candidatures, gestion admin
- **Témoignages** : Affichage homepage, création par les utilisateurs
- **Admin** : Panel Filament avec statistiques, graphiques, gestion complète
