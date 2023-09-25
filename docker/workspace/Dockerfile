FROM xpert13/workspace:v.1.8.3

# Configure non-root user.
ARG PUID=1000
ARG PGID=1000

USER root

RUN if [ ${PUID} -ne 0 ] && [ ${PGID} -ne 0 ]; then \
    userdel -f laradock &&\
    if getent group laradock ; then groupdel laradock; fi &&\
    groupadd -g ${PGID} laradock &&\
    useradd -l -u ${PUID} -g laradock laradock &&\
    adduser laradock sudo &&\
    install -d -m 0755 -o laradock -g laradock /home/laradock &&\
    chown --changes --silent --no-dereference --recursive \
          --from=$LARADOCK_PUID:$LARADOCK_PGID ${PUID}:${PGID} \
        /home/laradock \
        /usr/local/sbin/php-fpm \
        /usr/local/include/php/ext/session \
;fi


# Configure cron
USER laradock
RUN (crontab -l ; echo "* * * * * /usr/local/bin/php /var/www/artisan schedule:run >> /dev/null 2>&1") | crontab
USER root

# Source code
RUN chown www-data:www-data /var/www
COPY --chown=www-data:www-data ./ /var/www
WORKDIR /var/www

# Postgres
RUN docker-php-ext-install pdo pdo_pgsql


# Install xdebug and php packages
ARG APP_ENV=prod

COPY ./docker/workspace/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini
COPY ./docker/workspace/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

RUN if [ ${APP_ENV} = dev ]; \
        then \
            pecl install xdebug && docker-php-ext-enable xdebug && \
            rm -f /usr/local/etc/php/conf.d/opcache.ini; \
        else \
            rm -f /usr/local/etc/php/conf.d/xdebug.ini; \
        fi;

USER laradock
