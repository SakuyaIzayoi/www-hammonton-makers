# Docker Instructions

1. `docker build -t makers-apache2 .`
1. `docker run --name www-makers -p 0.0.0.0:8081:80 makers-apache2`

## Configuration

In `Dockerfile`...

*. `COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf`
