module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // If you're using Babel alongside TypeScript, uncomment the line below
    // transform: {
    //   '^.+\\.tsx?$': 'babel-jest',
    // },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json'
      }
    }
  };