export default {
  projects: [
    {
      displayName: 'node',
      roots: [ '<rootDir>/test' ],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
      },
      moduleFileExtensions: [ 'ts', 'tsx', 'js' ],
      testMatch: [ '**/*.test.ts' ],
      setupFiles: []
    }
  ]
};