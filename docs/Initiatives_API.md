# Initiatives API - version 2

## Swagger specification

When requested, you will be provided with a `swagger.json` [specification](https://swagger.io/specification/).

Swagger is an ecosystem of tools which facilitate API-first workflows.

## Swagger UI

[Swagger UI](https://github.com/swagger-api/swagger-ui) is a standard user-friendly tool to visualize the contents of a swagger specification. Please follow the [installation instructions](https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/installation.md) to start the project locally.

## Example

Because the swagger specification will be given on a no-cors https resource, you will need to apply a few steps in order to be able to see the spec in the UI.

An easy approach would be to use [`http-server`](https://www.npmjs.com/package/http-server) and serve the downloaded `dist` folder:

```sh
http-server --cors dist
```

If the `swagger.json` specification is within the `swagger-ui` project folder, then simply putting `swagger.json` inside the "Explore" input text box will suffice to visualize the contents of the file.
