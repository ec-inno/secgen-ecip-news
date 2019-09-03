# ECI CLI

Command line utilities.

```sh
yarn eci-cli
```

## Commands

### Fetch string translations

```sh
yarn eci-cli translations fetch
```

At the moment the endpoint is fixed to `${SITE_BASE_URL}/en/api/string-translations`.

It's recommended to run this command after:

```sh
yarn i18n:export
```

In order to fetch data about strings actually used in templates.

## Customizations

Refer to [gluegun](https://github.com/infinitered/gluegun) documentation pages for details.
