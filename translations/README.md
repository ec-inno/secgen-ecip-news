# Translations

Contains sets of strings for localisations, used in UI.

## Naming

- Follows React components
- Should not contain dashes
- Should be lowercase

Example: `basicpage` contains strings to localize `basic-page.jsx` template.

Exceptions:

- `404.jsx` follows a convention in Gatsby, but folder `404` is not acceptable because `translations` should be possible to source with `gatsby-source-filesystem` and integer type inferred for this case are blocking build with `GraphQLError: Syntax Error: Unexpected Int "404"`.

## Implementation

Althought folders are named after different types of React components, the logic is the same.

Examples:

- Components, regular ones: `/src/components`
- Page components: `/src/pages`, both server-side rendered or client-only
- Templates: `/src/templates`

Translations for page components should always contain `title` and `description` properties in order to override defaults from SEO component.
