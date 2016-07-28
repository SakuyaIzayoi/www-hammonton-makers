# Docker Instructions

## Building an Image

1. `docker build -t makers-apache2 .`
1. `docker run --name www-makers -p 0.0.0.0:8081:80 makers-apache2`

## Configuring Apache

In `Dockerfile`...

*. `COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf`

## Running a Container With Mounted Filesystem

If you want to do some development, instead of creating a new image every time a
file changes, just mount a local filesystem into the container like so:

`docker run -d -p 80:80 -v
{PATH_TO_MAKERS_REPO}/dist/:/usr/local/apache2/htdocs:ro httpd`
