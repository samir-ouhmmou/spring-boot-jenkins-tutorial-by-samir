# Tutoriel : Login Spring Boot + PostgreSQL (Docker) + HTML/JS/CSS

## Structure
```
springboot-login-tutorial/
├── docker-compose.yml     -> PostgreSQL
├── backend/               -> API Spring Boot (Java 17, Maven)
└── frontend/              -> index.html, style.css, app.js
```

## Prérequis
- Java 17+
- Maven (ou votre IDE : IntelliJ / VS Code / Eclipse)
- Docker Desktop

## 1. Lancer PostgreSQL
```bash
docker compose up -d
```
Vérifier : `docker ps` doit montrer `login-postgres`.

## 2. Lancer le backend
```bash
cd backend
mvn spring-boot:run
```
Au démarrage, Hibernate crée la table `users` et l'utilisateur
**admin / admin123** est inséré (mot de passe hashé en BCrypt).

## 3. Lancer le frontend
```bash
cd frontend
python -m http.server 5500
```
puis ouvrir http://localhost:5500
(ou utiliser l'extension Live Server de VS Code).

## 4. Tester l'API sans le frontend
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## Voir les données dans PostgreSQL
```bash
docker exec -it login-postgres psql -U postgres -d logindb -c "SELECT * FROM users;"
```

## Comment ça marche
1. Le formulaire (`app.js`) envoie `POST /api/auth/login` avec un JSON.
2. `AuthController` cherche l'utilisateur via `UserRepository` (Spring Data JPA).
3. `BCryptPasswordEncoder.matches()` compare le mot de passe saisi au hash en base.
4. Réponse `200` (succès) ou `401` (identifiants incorrects).

## Pour aller plus loin
- Ajouter l'inscription (`/api/auth/register`)
- Remplacer le `localStorage` par un token JWT + Spring Security
- Utiliser Flyway au lieu de `ddl-auto=update`
- Mettre le backend aussi dans Docker (Dockerfile)
