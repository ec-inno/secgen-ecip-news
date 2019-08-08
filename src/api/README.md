# Netlify functions

When the website is deployed to Netlify hosting, data will be fetched through endpoints provided by [Netlify functions](https://www.netlify.com/docs/functions/).These serverless functions are not used in production.

## Build

```sh
yarn build:api
```

## Serve

```sh
yarn serve:api
```

This will provide the following endpoints:

- `http://localhost:9000/initiatives` for all initiatives (list initiatives)
- `http://localhost:9000/initiative` for details of a single initiave, use query string parameters to select an initiative, i.e. `/initiative?year=2018&number=000004`
