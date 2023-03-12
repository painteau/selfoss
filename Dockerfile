# syntax=docker/dockerfile:1.4
FROM alpine:edge

ARG VERSION=2.19

ENV GID=991 UID=991 CRON_PERIOD=15m UPLOAD_MAX_SIZE=25M LOG_TO_STDOUT=false MEMORY_LIMIT=128M

RUN apk update 
RUN apk upgrade
RUN apk add ca-certificates 
RUN apk add libwebp 
RUN apk add musl 
RUN apk add nginx 
RUN apk add php
RUN apk add php-ctype 
RUN apk add php-curl 
RUN apk add php-dom 
RUN apk add php-fpm 
RUN apk add php-gd 
RUN apk add php-iconv
RUN apk add php-json 
RUN apk add php-mbstring 
RUN apk add php-pdo_mysql 
RUN apk add php-pdo_pgsql 
RUN apk add php-pdo_sqlite 
RUN apk add php-pecl-imagick 
RUN apk add php-session 
RUN apk add php-simplexml 
RUN apk add php-tidy 
RUN apk add php-xml 
RUN apk add php-xmlwriter 
RUN apk add php-zlib 
RUN apk add s6 
RUN apk add su-exec 
RUN apk add tini

COPY ./selfoss /selfoss
COPY --link rootfs /
RUN chmod +x /usr/local/bin/run.sh /services/*/run /services/.s6-svscan/*

VOLUME /selfoss/data
EXPOSE 8888
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD wget -q --spider localhost:8888/ || exit 1

CMD ["run.sh"]
