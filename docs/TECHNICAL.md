# Technical overview

This document contains fundamental technical specifics for the project.

## Environment variables

The project relies on several variables which are documented in `.env.example`.

[Variables prefixed with `GATSBY_`](https://www.gatsbyjs.org/docs/environment-variables) are special: they are needed to client-only code.

## Starting the project

By default, the Github repository provides seed data at the location of `DRUPAL_JSONAPI_OFFLINE_FOLDER`. If `GATSBY_DRUPAL_API_OFFLINE` is set, you can already start a server with the seed data:

```sh
yarn eci-cli api serve
```

In another terminal session, start the Gatsby site:

```sh
yarn start
```

If there's no seed data or you want to use another copy, in `.env` update the following:

```
GATSBY_DRUPAL_API=https://remote-drupal.site
GATSBY_DRUPAL_API_OFFLINE=http://localhost:3000
DRUPAL_JSONAPI_OFFLINE_FOLDER=api/drupal/jsonapi
```

Downloading data:

```sh
yarn eci-cli api download --entitiesConfig config/entities.json --languagesConfig config/languages.json
```

This could be done selectively in the following way:

```sh
yarn eci-cli api download --entities node--oe_news,node--oe_page,menu --languages en,bg,fr
```

## Refresh data when using remote API

By default it's necessary to rebuild the project (re-run `yarn start`) on source data changes when seed data is not used.

There's is an environment variable `ENABLE_GATSBY_REFRESH_ENDPOINT` which could be used to save time from restarts in the following way:

```sh
ENABLE_GATSBY_REFRESH_ENDPOINT=true yarn start
```

Having started the project with this flag, Gatsby will expose an `/__refresh` endpoint through which sourced content can be refreshed without restarting the whole build process.

A simple way to refresh content would be:

```sh
curl -X POST http://localhost:8000/__refresh
```

This will re-fetch data from remote server and refresh local content used by the locally built (on-the-fly) instance.

## Building the site

- Test: `yarn build:test` (draft content)
- Prod: `yarn build:prod` (published content)
