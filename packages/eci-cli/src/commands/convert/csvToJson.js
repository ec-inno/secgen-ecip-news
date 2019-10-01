module.exports = {
  name: 'csvToJson',
  run: toolbox => {
    const {
      filesystem: { read, write },
      parameters: { first, options },
      print: { info },
    } = toolbox;

    if (!first) {
      return info('Please provide path to CSV file.');
    }

    const parse = require('csv-parse/lib/sync');

    info('Converting input file to JSON ...');

    const csv = read(first);

    const json = parse(csv, { columns: true });

    if (!options.output) {
      info('No output dir given, using current one as fallback.');
      return write('output.json', json);
    }

    if (!options.output.includes('.json')) {
      info(`Saving to ${options.output}/output.json`);
      return write(`${options.output}/output.json`, json);
    }

    info(`Creating ${options.output} ...`);
    return write(options.output, json);
  },
};
