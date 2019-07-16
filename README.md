# SecGen ECIP Client

Website built with Gatsby.js based on API-first [Drupal 8 backend](https://github.com/ec-europa/secgen-ecip-reference).

## Getting Started

**Recommended versions of required software:**

- Node.js >= 8.16.0
- yarn >= 1.16.0

We recommend you to use [Node Version Manager](https://github.com/creationix/nvm) and to run `nvm install` in the root followed by `nvm use` to get the right Node.js version, the `.mvrc` file in the root of your project is selecting for you the latest available node lts release.

## Backend API

You will need a running Drupal 8 website with a JSONAPI endpoint before being able to run or build the client website.

Given you have a running Drupal 8 API, set the following environment variables:

- `SITE_BASE_URL`: defaults to `http://localhost:8080/web` if not provided
- `DRAFT_PREVIEW`: flag whether client is to fetch unpublished content.

If `DRAFT_PREVIEW` is to be truthy, please provide also:

- `BASIC_AUTH_USERNAME`
- `BASIC_AUTH_PASSWORD`

The `BASIC_AUTH_*` variables should be safely stored in a vault and should not be commited under source control! Also, they have to reflect an existing Drupal user in the API with sufficient permissions to see unpublished content. (In terms of the corporate editorial worklow, this means an `editor` or `validator` user.)

## Local development

Install dependencies:

```
$ yarn
```

Start project:

```
$ yarn start
```

- Website: `http://localhost:8000/`
- GraphiQL IDE: `http://localhost:8000/___graphql`

## Building the site

- Test: `yarn build:test` (requires basic authentication, shows unpublished content)
- Prod: `yarn build:prod` (shows only validated/published content)
