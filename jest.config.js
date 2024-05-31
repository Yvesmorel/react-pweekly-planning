// Sync object
const config = {
    verbose: true,
    transform: {
        '.+\\.tsx?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
};
export default config;
