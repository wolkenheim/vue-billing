let config;

try {
  config = require('../config/config.json');
} catch (ex) {
  config = require('../config/config.default.json');
}

export default config;
