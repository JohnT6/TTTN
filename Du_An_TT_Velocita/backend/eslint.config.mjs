import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            "no-console": "warn",
            "prefer-const": "error",
            "@typescript-eslint/no-explicit-any": "error",
            quotes: [2, "single"],
            "no-undef": "off",
        },
    },
    {
        files: ["src/**/*.ts"],
        ignores: ["node_modules/", "dist/"],
    },
    eslintConfigPrettier,
);
