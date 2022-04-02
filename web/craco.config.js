const path = require('path')
const {when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES} = require('@craco/craco')

module.exports = {
  reactScriptsVersion: 'react-scripts',
  style: {},
  eslint: {},
  babel: {
    presets: [],
    plugins: [],
    loaderOptions: {},
  },
  typescript: {
    enableTypeChecking: true, // (default value)
  },
  webpack: {},
  jest: {},
  devServer: {},
  plugins: [
    {
      plugin: require('autoprefixer'),
    },
    {
      plugin: require('craco-alias'),
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.extend.json',
      },
    },
  ],
}
