// export default {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   transform: { '^.+\\.ts?$': 'ts-jest' },
//   moduleNameMapper: {
//     '\\.(css|scss)$': 'identity-obj-proxy',
//   },
//   setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Optional: Set up any custom test setup file
//   collectCoverage: true,
//   coverageDirectory: "coverage",
// }

export default {
  preset: "ts-jest",
  verbose: true,
  testEnvironment: "jest-environment-jsdom",
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jestHelpers/fileTransformer.mjs',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}

// export default {
//   preset: 'ts-jest',
//   transform: { '^.+\\.ts?$': 'ts-jest' },
//   clearMocks: true,
//   collectCoverage: true,
//   coverageDirectory: "coverage",
// }
//
// export default {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   moduleNameMapper: {
//     '\\.(css|scss)$': 'identity-obj-proxy',
//   },
//   setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Optional: Set up any custom test setup file
//   collectCoverageFrom: [
//     'src/**/*.{js,jsx,ts,tsx}',
//     '!src/index.tsx', // Exclude the main entry point
//   ],
// };