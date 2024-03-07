import tailwindcss from "prettier-plugin-tailwindcss";

/** @type {import("prettier").Config} */
const config = {
  trailingComma: "none",
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: "as-needed",
  bracketSpacing: true,
  arrowParens: "always",
  jsxBracketSameLine: false,
  endOfLine: "lf",
  tailwindConfig: "./tailwind.config.js",
  overrides: [
    {
      files: ".prettierrc",
      options: {
        parser: "json",
      },
    },
  ],
  plugins: [tailwindcss],
};

export default config;
