module.exports = {
    preset: 'ts-jest',
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|svg)$": "<rootDir>/mocks/fileMock.js",
        "\\.(css|scss|less)$": "<rootDir>/mocks/fileMock.js",

    }
}