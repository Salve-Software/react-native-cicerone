const path = require('path');
const { getConfig } = require('react-native-builder-bob/babel-config');
const pkg = require('../package.json');

const root = path.resolve(__dirname, '..');

module.exports = function (api) {
  api.cache(true);

  // No module-resolver here on purpose: Metro resolves `@/` and `~/` from
  // example/tsconfig.json, so a stale babel cache cannot break the bundle.
  return getConfig(
    {
      presets: ['babel-preset-expo'],
    },
    { root, pkg },
  );
};
