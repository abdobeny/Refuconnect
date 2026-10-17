#!/usr/bin/env bash
#
# Container entrypoint for the RefuConnect API.
# Renders the nginx config for the port provided by the host, prepares the
# Laravel application, then starts php-fpm and nginx under supervisord.
#
set -euo pipefail

cd /var/www/html

export PORT="${PORT:-10000}"

echo "==> Rendering nginx configuration (listen :${PORT})"
envsubst '${PORT}' < docker/nginx.conf.template > /etc/nginx/nginx.conf

echo "==> Discovering packages"
php artisan package:discover --ansi

echo "==> Clearing stale caches"
php artisan config:clear

echo "==> Linking public storage"
php artisan storage:link || true

if [ "${RUN_MIGRATIONS:-1}" = "1" ]; then
    echo "==> Running database migrations"
    php artisan migrate --force
fi

if [ "${RUN_SEEDER:-0}" = "1" ]; then
    echo "==> Seeding database"
    php artisan db:seed --force
fi

# NOTE: route:cache is intentionally skipped — several routes use closures
# (routes/api.php and routes/web.php) which cannot be serialized for caching.
echo "==> Warming caches"
php artisan config:cache
php artisan view:cache

echo "==> Starting php-fpm + nginx"
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
