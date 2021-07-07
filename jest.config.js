module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
    modulePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/config/'],
};
