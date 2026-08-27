const path = require('path');
const { getConfig } = require('react-native-builder-bob/babel-config');
const pkg = require('../package.json');

const root = path.resolve(__dirname, '..');

module.exports = function (api) {
  api.cache(true);

  return getConfig(
    {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module-resolver',
          {
            // Both, and absolute: library files are transformed by this config too.
            alias: {
              '@': path.resolve(root, 'src'),
              '~': path.resolve(__dirname, 'src'),
            },
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
          },
        ],
      ],
    },
    { root, pkg },
  );
};
