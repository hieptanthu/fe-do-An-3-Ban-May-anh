const path = require('path');

module.exports = {
  // other configurations
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  }
};
