# European citizens' initiative

A [headless Drupal](https://dri.es/tag/headless-drupal) project started off OpenEuropa's [starter template](https://github.com/openeuropa/drupal-site-template) based on [OpenEuropa Profile](https://github.com/openeuropa/oe_profile). Uses [Gatsby.js](https://www.gatsbyjs.org/) for delivering performant client-side application using [Europa Component Library](https://github.com/ec-europa/europa-component-library) styles in order to follow European Commission visual identity.

## Useful resources

- Back-end installation: [[Docker](./docs/installation-docker.md) | [LAMP](./docs/installation-lamp.md)]
- [Client application](./gatsby)
- [Development tips and tricks](./docs/development.md)

## SPARQL

Add this to your `settings.php`:

```
$databases["sparql_default"] = array(
  'default' => array(
    'prefix' => '',
    'host' => 'sparql',
    'port' => '8890',
    'namespace' => 'Drupal\\Driver\\Database\\sparql',
    'driver' => 'sparql'
  )
);
```
