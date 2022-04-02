module.exports = function (api /*: any */) {
  if (api.env() === 'test') {
    return {
      plugins: [
        '@babel/plugin-proposal-optional-catch-binding',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
      ],
      presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
    }
  }

  return {
    plugins: [
      '@babel/plugin-proposal-optional-catch-binding',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
    ],
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  }
}
