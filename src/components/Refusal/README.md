# Refusal

The component provides feedback on why a given initiative is refused/rejected. Status message translations are based on a CSV file. Follow the guidelines below to update `messages.json` when necessary.

## Using ECI CLI

```sh
yarn eci-cli
```

The command used to convert the input CSV file to JSON is:

```sh
yarn eci-cli convert csvToJson
```

## Parameters and options

- parameters: it's only 1 - the path to the CSV file to convert.
- options: it's also only 1 - the output path

Examples:

```sh
yarn eci-cli convert csvToJson ~/Downloads/rejections.csv --output src/components/Refusal
```

Or specify name:

```sh
yarn eci-cli convert csvToJson ~/Downloads/rejections.csv --output src/components/Refusal/messages.json
```

Or if you want to simply get `output.json` in the root of the project:

```sh
yarn eci-cli convert csvToJson ~/Downloads/rejections.csv
```
