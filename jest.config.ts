// jest.config.ts
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: [
    "<rootDir>/src/**/tests/*.test.ts",
    "<rootDir>/tests/**/*.test.ts",
  ], // Match your test files
  moduleDirectories: ["node_modules", "src", "tests"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/build", "<rootDir>/node_modules"], // Exclude build and node_modules directories
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
};

export default config;
