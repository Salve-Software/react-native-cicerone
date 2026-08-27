module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: { '@': './src' },
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
