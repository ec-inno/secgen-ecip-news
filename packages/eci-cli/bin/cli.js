#!/usr/bin/env node

const pkg = require('../package.json');

// If no arguments provided, display help menu.
if (!process.argv.slice(2).length) {
  return console.log('Missing args');
}
