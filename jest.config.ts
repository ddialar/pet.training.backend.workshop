import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.paths.json'
const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })

export default {
  coverageProvider: 'v8',
  globalSetup: '<rootDir>/jest.dotenv.config.ts',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'js',
    'ts'
  ],
  moduleNameMapper,
  preset: 'ts-jest',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  testRegex: ['^.*\\.(test|spec)\\.ts$'],
  transform: { '^.+\\.ts$': 'ts-jest' },
  verbose: false
}
