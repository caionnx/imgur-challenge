import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: "node_modules/ts-jest-mock-import-meta", // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
              options: {
                metaObjectReplacement: {
                  env: {
                    VITE_INITIAL_STATE_SEARCH_API:
                      "https://www.mock_env.com/search",
                    VITE_INITIAL_STATE_GALLERY_API:
                      "https://www.mock_env.com/gallery",
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
export default config;
