## Configuration de la Base de Données (Backend)

Si vous venez de cloner le projet, suivez ces étapes pour configurer la base de données :

1.  **Créer la base de données** :
    Créez une base de données MySQL nommée `fmdd_laravel` (ou le nom spécifié dans votre `.env`).

2.  **Configurer le fichier .env** :
    ```bash
    cp .env.example .env
    ```
    Mettez à jour les informations de connexion (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).

3.  **Lancer les migrations et les données de test** :
    ```bash
    php artisan migrate:fresh --seed
    ```
    Cette commande va :
    - Supprimer toutes les tables existantes.
    - Recréer le schéma complet.
    - Ajouter les événements (Job Day IFIAG), les utilisateurs de test (Admin/User), une formation et une offre d'emploi.

## Comptes de Test par Défaut

| Type | Email | Mot de passe | Rôle |
|------|-------|--------------|------|
| Admin | `admin@fmdd.com` | `admin123` | ADMIN |
| User | `user@test.com` | `user123` | USER |

I've created test data files for you. Here's the simplest way to add them:

### Option 1: Using phpMyAdmin or MySQL Workbench (EASIEST)
1. Open phpMyAdmin or MySQL Workbench
2. Select the `fmdd_laravel` database
3. Copy and paste the SQL below into the SQL tab and execute:

```sql
-- Admin User (email: admin@fmdd.com, password: password123)
INSERT INTO users (id, email, password, role, created_at, updated_at) 
VALUES ('a1234567-89ab-cdef-0123-456789abcdef', 'admin@fmdd.com', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', NOW(), NOW());

INSERT INTO profiles (id, user_id, first_name, last_name, bio, skills, preferences, created_at, updated_at) 
VALUES (UUID(), 'a1234567-89ab-cdef-0123-456789abcdef', 'FMDD', 'Administrator', 'Platform administrator', 
JSON_ARRAY('Management', 'Leadership'), JSON_OBJECT('language', 'fr'), NOW(), NOW());

-- Regular User (email: user@test.com, password: password123)
INSERT INTO users (id, email, password, role, created_at, updated_at) 
VALUES ('b2345678-9abc-def0-1234-56789abcdef0', 'user@test.com', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER', NOW(), NOW());

INSERT INTO profiles (id, user_id, first_name, last_name, bio, skills, preferences, created_at, updated_at) 
VALUES (UUID(), 'b2345678-9abc-def0-1234-56789abcdef0', 'Test', 'User', 'Regular test user', 
JSON_ARRAY('Communication', 'Teamwork'), JSON_OBJECT('language', 'en'), NOW(), NOW());

-- Formation
INSERT INTO formations (id, title, description, image, duration, level, category, is_paid, created_at, updated_at) 
VALUES (UUID(), 'Introduction au Marketing Digital', 
'Formation complète sur le marketing digital',
'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 
'6 semaines', 'Débutant', 'Marketing', 0, NOW(), NOW());

-- Job Offer
INSERT INTO job_offers (id, title, company, location, type, category, duration, salary, description, skills, is_remote, created_at, updated_at) 
VALUES (UUID(), 'Développeur Web Full Stack', 'Tech Innovators SARL', 'Casablanca, Maroc', 'CDI', 'Tech', 'Permanent', 
'8000 - 12000 MAD', 'Développeur web full stack passionné', 
'JavaScript, React, Node.js, Laravel', 1, NOW(), NOW());
```

## Test Accounts Created

Once you run the SQL above:

| Type | Email | Password | Role |
|------|-------|----------|------|
| Admin | admin@fmdd.com | password123 | ADMIN |
| User | user@test.com | password123 | USER |

## What's Created

- ✅ **1 Admin Account** with profile
- ✅ **1 Regular User Account** with profile  
- ✅ **1 Formation**: "Introduction au Marketing Digital"
- ✅ **1 Job Offer**: "Développeur Web Full Stack" at Tech Innovators SARL

## Testing the API

After adding the data, you can test the Laravel API:

### Login as Admin
```bash
POST http://127.0.0.1:8000/api/auth/login
Content-Type: application/json

{
  "email": "admin@fmdd.com",
  "password": "password123"
}
```

### Login as User
```bash
POST http://127.0.0.1:8000/api/auth/login
Content-Type: application/json

{
  "email": "user@test.com",
  "password": "password123"
}
```
