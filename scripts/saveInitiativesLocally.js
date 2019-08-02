#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const getInitiatives = require('../src/utils/getInitiatives');

const saveInitiativesLocally = async () => {
  const apiFolder = path.resolve(__dirname, '../api');

  try {
    console.time('Initiatives saved locally to save resources');
    console.log('Started downloading initiatives from remote service ...');

    const initiatives = await getInitiatives();
    // Create cache directory.
    if (!fs.existsSync(apiFolder)) {
      fs.mkdirSync(apiFolder);
    }

    fs.writeFileSync(
      `${apiFolder}/initiatives.json`,
      JSON.stringify(initiatives)
    );

    console.timeEnd('Initiatives saved locally to save resources');
    console.log('Available at:', apiFolder);
  } catch (error) {
    console.error('Could not save initiatives locally.', error.message);
  }
};

saveInitiativesLocally();
