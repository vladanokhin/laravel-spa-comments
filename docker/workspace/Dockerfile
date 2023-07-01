FROM php:8.0.2-fpm-alpine

# Install packages
RUN apk update
RUN apk add --no-cache curl git build-base zlib-dev oniguruma-dev autoconf bash nano nodejs npm
RUN apk add --update linux-headers

# Configure non-root user.
ARG PUID=1000
ARG PGID=1000
RUN apk --no-cache add shadow && \
    groupmod -o -g ${PGID} www-data && \
    usermod -o -u ${PUID} -g www-data www-data

# Source code
RUN chown www-data:www-data /var/www
COPY --chown=www-data:www-data ./ /var/www
WORKDIR /var/www

RUN chown -R www-data:www-data /var/www/vendor/

# Postgres
RUN apk add --no-cache postgresql-dev && docker-php-ext-install pdo pdo_pgsql

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install xdebug and php packages
ARG APP_ENV=prod
RUN if [ ${APP_ENV} = dev ]; \
    then \
      pecl install xdebug && docker-php-ext-enable xdebug && \
      composer install --no-interaction; \
    else \
      composer install --no-dev --no-interaction --no-progress --no-scripts --optimize-autoloader; \
    fi;

COPY ./docker/workspace/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

CMD php-fpm

EXPOSE 9000
