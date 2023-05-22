module.exports = {
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  testPathIgnorePatterns: ["/node_modules/"],
  testMatch: ["**/__tests__/**/(*.)+(spec|test).[jt]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};
