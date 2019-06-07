# Development tips and tricks

Set of hints for developers working with the current repository and its varied technology stack.

## Tools' documentation pages

- [Drupal Console](https://hechoendrupal.gitbooks.io/drupal-console/content/en/index.html)

## Installing dependencies

Details on [Drupal+Composer toolchain](https://www.drupal.org/docs/develop/using-composer/using-composer-to-install-drupal-and-manage-dependencies#adding-modules).

```sh
$ docker-compose exec web composer require drupal/jsonapi_extras
```

## Using Drupal Console

```sh
$ docker-compose exec web ./vendor/drupal/console/bin/drupal site:statistics
```

## Clearing cache

This command is frequently used, you might want to make an alias for it.

```sh
$ docker-compose exec web ./vendor/drupal/console/bin/drupal cache:rebuild
```

## Installing modules

```sh
$ docker-compose exec web ./vendor/drupal/console/bin/drupal module:install jsonapi jsonapi_extras jsonapi_defaults
```

## Docker

Enter website's container:

```sh
$ docker exec -ti 82d95e8d23e4 /bin/bash
```

Where `82d95e8d23e4` is an ID which you can see by:

```sh
$ docker ps
```

## Export configurations

With the console

```sh
$ docker-compose exec web ./vendor/drupal/console/bin/drupal config:export
```

or, as documented in the main `README.md`

```sh
$ docker-compose exec web drush cex
```
