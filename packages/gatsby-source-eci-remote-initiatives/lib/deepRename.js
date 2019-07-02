const { forEach, isObject } = require('lodash');

const prefix = '@';
const object = {};
let newKey = '';

const deepRename = (curr, prop) => {
  prop = prop || '';

  forEach(curr, (value, key) => {
    newKey = key[0] === prefix ? key.slice(1) : key;

    if (prop) {
      delete curr[key];
      curr[newKey] = value;

      if (isObject(curr[newKey])) {
        return deepRename(curr[newKey], key);
      }
    } else {
      object[newKey] = value;
    }

    if (isObject(curr[key])) {
      deepRename(object[newKey], key);
    }
  });
};

module.exports = deepRename;
