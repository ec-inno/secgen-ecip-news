const { build } = require('gluegun');

require('dotenv').config();

async function run(argv) {
  const cli = build()
    .brand('eci-cli')
    .src(__dirname)
    .help()
    .version()
    .create();

  const toolbox = await cli.run(argv);

  return toolbox;
}

module.exports = { run };
