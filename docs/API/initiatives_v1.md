# Initiatives API - version 1

Contains details on how the project is integrating with the [Initiatives API](https://ec.europa.eu/citizens-initiative/services/initiative/get/all).

## Background information

The API has a no-cors policy and limited set of features. This document focuses on how developers can work with the API in terms of Gatsby.js integration rather than the API itself.

As of August 2019, the API provides two main endpoints: one for the list of initaitives and another one the details of a given item.

## Working locally: offline scenario

There are utilities to help you develop with the information from the API when you do not have access to the Internet.

Get a fresh copy of online data:

```sh
yarn api:download
```

Serve it:

```sh
yarn api:serve
```

In short:

```sh
yarn api:start
```

The result of this is that you will be able to fetch all initiatives from `http://localhost:4000/get/all` even when being offline. Details of an initiative are at `http://localhost:4000/details/2019/000009` similarly to the production version.

Because it's necessary to pass the context of being offline to client-side code, [environment variable](https://www.gatsbyjs.org/docs/environment-variables/) `GATSBY_OFFLINE` is required for the described server to work:

```sh
GATSBY_OFFLINE=true yarn start
```

Alternatively:

```sh
yarn start:offline
```

If `GATSBY_OFFLINE` is not set, system falls back to online scenarios.

## Working locally: online scenario

If you are required to access latest information and it's not acceptable to have a local copy, the setup provides an integration with [Gatsby proxy](https://www.gatsbyjs.org/docs/api-proxy/).

When you make requests to `/initiatives` you will be working with https://ec.europa.eu/citizens-initiative/services under the hood bypassing the no-cors policy.
