module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  'collectCoverage': true,
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx'
  ],
  'moduleDirectories': [
    './node_modules',
    './src'
  ],
  'transform': {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  }
}
