# Laravel Backend Deployment to cPanel TODO

- [x] Prepare production .env file with cPanel DB details (database: fmddz0lw_fmdd_db, user: fmddz0lw_fmdd_user, password: b9!ge1Zg4J)h~9NP, host: localhost, port: 3306)
- [ ] Install production dependencies (composer install --no-dev)
- [ ] Build frontend assets (npm run build)
- [ ] Generate application key (php artisan key:generate)
- [ ] Upload files to cPanel via FTP (to public_html or subdomain directory)
- [ ] Run database migrations (php artisan migrate --force)
- [ ] Run database seeders if needed (php artisan db:seed --force)
- [ ] Configure public directory and permissions (ensure public/ is web root, set permissions)
- [ ] Test the deployment (check API endpoints, database connection)
