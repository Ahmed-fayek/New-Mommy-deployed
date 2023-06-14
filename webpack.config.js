const path = require('path');

module.exports = {
  // Add the following lines to your existing webpack configuration
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
    "util": require.resolve("util/")

    }
  },
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // your existing rules for loading JavaScript and other files
    ],
  },
  // your existing plugins
};