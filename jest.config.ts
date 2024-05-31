import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
  '.+\\.tsx?$': 'ts-jest',
  '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
export default config;