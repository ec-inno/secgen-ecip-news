# Project documentation

Contains a high-level overview for Gatsby-specific technical implementations and workflows.

If you are rather looking for topics related to integration with third-party services when data is not sourced in Gatsby but fetched client-only: please refer to [this guide](./API/README.md).

## Environment variables

The project relies on several variables described below. When working locally, one can set these by copying `.env.example` and setting values into `.env`.

To pass information from to client-only code (dynamic data fetching), please use [variables prefixed with `GATSBY_`](https://www.gatsbyjs.org/docs/environment-variables).

## Backend API

You will need a running Drupal 8 website with a JSONAPI endpoint before being able to run or build the client website. Content from Drupal is sourced (Gatsby term), which means that data is cached and HTML is rendered server-side during Gatsby build task.

Given you have a running Drupal 8 API, set the following environment variables:

- `SITE_BASE_URL`: defaults to `http://localhost:8080/web` if not provided
- `DRAFT_PREVIEW`: flag whether client is to fetch unpublished content.

If `DRAFT_PREVIEW` is to be truthy, please provide also:

- `BASIC_AUTH_USERNAME`
- `BASIC_AUTH_PASSWORD`

The `BASIC_AUTH_*` variables should be safely stored in a vault and should not be commited under source control! Also, they have to reflect an existing Drupal user in the API with sufficient permissions to see unpublished content. (In terms of the corporate editorial worklow, this means an `editor` or `validator` user.)

If `DRAFT_PREVIEW` is set and truthy, but credentials are missing, Drupal will provide only public/published type of content. Meaning, if you miss credentials, the site will work in production mode not being able to fetch drafts.

## Local development

Copy `.env.example` to `.env` and set values.

Install dependencies:

```
$ yarn
```

Start project:

```
$ yarn start
```

Having the project running, you will be able to reach the following:

- Website: `http://localhost:8000/`
- GraphiQL IDE: `http://localhost:8000/___graphql`

## Building the site

- Test: `yarn build:test` (draft content)
- Prod: `yarn build:prod` (published content)

## Automation systems

They are currently 2:

- [Drone CI](https://drone.fpfis.eu/ec-europa/secgen-ecip-client-reference): deploys new versions of the website when there are changes in content in Drupal CMS.
- Netlify [test](https://app.netlify.com/sites/secgen-ecip-test/deploys) and [prod](https://app.netlify.com/sites/secgen-ecip-prod/overview): deploy new versions of the webiste on code changes.

Both Drone CI and Netlify environments need to know about `SITE_BASE_URL`, `BASIC_AUTH_USERNAME` and `BASIC_AUTH_PASSWORD`.

## Content updates

For both unpublished (test) and published (prod) types of content Drupal provides webhooks. Webhooks are bound to draft/publish/delete content events. Thus, Drupal pushes notifications as [Github deployment events](https://developer.github.com/v3/repos/deployments/#create-a-deployment).

When Github is used as an Oauth client, an environment variable `CI_BUILD_TARGET` in Drone CI marks the type of deployment event.

Please make sure that Drupal is using a valid Github web token issued by an application or user with sufficient permissions to trigger deployments on target repository.
