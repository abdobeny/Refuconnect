###############################################################################
# RefuConnect API — production image
# PHP 8.3 FPM + Nginx + Supervisor, built from the Laravel backend.
#
# Multi-stage:
#   1. `assets`  -> compiles the Vite / Filament theme into public/build
#   2. runtime   -> PHP-FPM + Nginx serving the Laravel app
###############################################################################

# ---------------------------------------------------------------------------
# Stage 1 — build the front-end assets used by the Filament admin panel
# ---------------------------------------------------------------------------
FROM node:22-bookworm-slim AS assets

WORKDIR /app

# Install JS dependencies first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Only the files Vite needs
COPY resources ./resources
COPY public ./public
COPY vite.config.js ./

RUN npm run build

# ---------------------------------------------------------------------------
# Stage 2 — runtime
# ---------------------------------------------------------------------------
FROM php:8.3-fpm

ENV DEBIAN_FRONTEND=noninteractive

# System packages + PHP extensions required by Laravel / Filament
RUN apt-get update && apt-get install -y --no-install-recommends \
        nginx \
        supervisor \
        gettext-base \
        git \
        unzip \
        curl \
        libpq-dev \
        libpng-dev \
        libjpeg62-turbo-dev \
        libfreetype6-dev \
        libicu-dev \
        libzip-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
        pdo \
        pdo_pgsql \
        pdo_mysql \
        gd \
        intl \
        zip \
        bcmath \
        exif \
        pcntl \
        opcache \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Composer binary (from the official image)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Application source (see .dockerignore for exclusions)
COPY . .

# PHP dependencies. Artisan bootstrapping happens at container start so that
# runtime environment variables are available.
RUN composer install \
        --no-dev \
        --no-interaction \
        --no-scripts \
        --prefer-dist \
        --optimize-autoloader

# Compiled Vite / Filament assets produced in stage 1
COPY --from=assets /app/public/build ./public/build

# Runtime configuration
COPY docker/nginx.conf.template /etc/nginx/nginx.conf.template
COPY docker/supervisord.conf     /etc/supervisor/conf.d/supervisord.conf
COPY docker/php-fpm.conf         /usr/local/etc/php-fpm.d/zz-refuconnect.conf
COPY docker/php.ini              /usr/local/etc/php/conf.d/zz-refuconnect.ini

# Writable runtime directories
RUN mkdir -p \
        storage/framework/cache/data \
        storage/framework/sessions \
        storage/framework/views \
        storage/logs \
        bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R ug+rwX storage bootstrap/cache \
    && chmod +x docker/start.sh

EXPOSE 10000

CMD ["bash", "docker/start.sh"]
