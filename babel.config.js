const path = require('path');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: { '@': path.resolve(__dirname, 'src') },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    ],
  ],
  overrides: [
    {
      exclude: /\/node_modules\//,
      presets: ['module:react-native-builder-bob/babel-preset'],
    },
    {
      include: /\/node_modules\//,
      presets: ['module:@react-native/babel-preset'],
    },
  ],
};
