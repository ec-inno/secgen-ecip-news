# Initiatives API

Contains details on how the project is integrating with the [Initiatives API](https://ec.europa.eu/citizens-initiative/services/initiative/get/all).

## Background information

The API has a no-cors policy and limited set of features. This document is going to focus on how developers can work with the API in terms of Gatsby.js integration rather than the API itself.

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

The result of this is that you will be able to fetch all initiatives from `http://localhost:4000` even when being offline.

## Working locally: online scenario

If you are required to access latest information and it's not acceptable to have a local copy, the setup provides an integration with [Gatsby proxy](https://www.gatsbyjs.org/docs/api-proxy/).

When you make requests to `/initiatives` you will be working with https://ec.europa.eu/citizens-initiative/services under the hood bypassing the no-cors policy.

## Initiatives on websites hosted on netlify.com

When the website is deployed to Netlify hosting, data will be fetched through endpoints provided by [Netlify functions](https://www.netlify.com/docs/functions/).These serverless functions are not used in production.

The functions are stored in `src/api` folder and there is a command to develop locally if necessary:

```sh
yarn serve:api
```

This will provide the following endpoints:

- `http://localhost:9000/initiatives` for all initiatives (list initiatives)
- `http://localhost:9000/initiative` for details of a single initiave, use query string parameters to select an initiative, i.e. `/initiative?year=2018&number=000004`

Please note that these are proxy type of endpoints, they will work only when you are online. If you want to develop offline, refer to "Working locally: offline scenario" section.
