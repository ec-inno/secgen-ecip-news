# Docker installation

## Requirements

- [Docker](https://www.docker.com/get-docker)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuration

By default, Docker Compose reads two files: `docker-compose.yml` and `docker-compose.override.yml` (optional).

By convention, `docker-compose.yml` contains default configurations, whereas `docker-compose.override.yml` contains overrides for existing or entirely new services.

If a service is defined in both files, Docker Compose merges the configurations.

Find more about Docker Compose extension mechanism in [the official Docker Compose documentation](https://docs.docker.com/compose/extends/).

## Commands

Start the whole stack:

```bash
docker-compose up
```

It's advisable to not run processes `docker-compose` in a deamon mode so you can turn it off (`CTRL+C`) quickly. However, if you'd like to run processes in deamon, add `-d` flag:

```bash
docker-compose up -d
```

Install dependencies

```bash
docker-compose exec web composer install
```

Make Drupal installation:

```bash
docker-compose exec web ./vendor/bin/run toolkit:install-clean
```

Using the default configuration, the development site files should be available in a `web` directory and the development site
should be served at: [http://127.0.0.1:8080/web](http://127.0.0.1:8080/web).

Run tests, grumphp checks:

```bash
docker-compose exec web ./vendor/bin/grumphp run
```

To run the phpunit tests:

```bash
docker-compose exec web ./vendor/bin/phpunit
```

To run the behat tests:

```bash
docker-compose exec web ./vendor/bin/behat
```
