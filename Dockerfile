# syntax=docker/dockerfile:1.4
FROM alpine:latest

ARG VERSION=2.19
ARG SHA256_HASH="e49c4750e9723277963ca699b602f09f9148e2b9f258fce6b14429498af0e4fc"

ENV GID=991 UID=991 CRON_PERIOD=15m UPLOAD_MAX_SIZE=25M LOG_TO_STDOUT=false MEMORY_LIMIT=128M

RUN apk upgrade --no-cache \
 && apk add --no-cache \
    ca-certificates \
    libwebp \
    musl \
    nginx \
    php8 \
    php8-ctype \
    php8-curl \
    php8-dom \
    php8-fpm \
    php8-gd \
    php8-iconv \
    php8-json \
    php8-mbstring \
    php8-pdo_mysql \
    php8-pdo_pgsql \
    php8-pdo_sqlite \
    php8-pecl-imagick \
    php8-session \
    php8-simplexml \
    php8-tidy \
    php8-xml \
    php8-xmlwriter \
    php8-zlib \
    s6 \
    su-exec \
    tini \
 && wget -q https://dl.cloudsmith.io/public/fossar/selfoss-git/raw/names/selfoss.zip/versions/${VERSION}/selfoss-${VERSION}.zip -P /tmp \
 && CHECKSUM=$(sha256sum /tmp/selfoss-$VERSION.zip | awk '{print $1}') \
 && if [ "${CHECKSUM}" != "${SHA256_HASH}" ]; then echo "Warning! Checksum does not match!" && exit 1; fi \
 && mkdir /selfoss && unzip -q /tmp/selfoss-$VERSION.zip -d / \
 && rm -rf /tmp/*

COPY --link rootfs /
RUN chmod +x /usr/local/bin/run.sh /services/*/run /services/.s6-svscan/*

VOLUME /selfoss/data
EXPOSE 8888
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD wget -q --spider localhost:8888/ || exit 1

CMD ["run.sh"]
