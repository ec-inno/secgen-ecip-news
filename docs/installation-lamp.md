# LAMP installation

## Requirements

- [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)

## Configuration

Customize the default configuration values by copying `runner.yml.dist` to `runner.yml`:

```bash
cp runner.yml.dist runner.yml
```

Now edit `runner.yml` with your most beloved text editor. You will want to set
the database host to `localhost`, and provide the correct database name and
credentials. Also update the `base_url` and Selenium path to match your local
environment.

## Commands

Install the website using the task runner:

```bash
./vendor/bin/run drupal:site-install
```

The site will be available through your local web server.

To verify whether everything works as expected, you can run the example Behat
test suite:

```bash
./vendor/bin/behat
```
