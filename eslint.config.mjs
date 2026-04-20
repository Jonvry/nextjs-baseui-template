import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import unusedImports from "eslint-plugin-unused-imports"
import { defineConfig, globalIgnores } from "eslint/config"

const eslintConfig = defineConfig([
   ...nextVitals,
   ...nextTs,
   // Override default ignores of eslint-config-next.
   globalIgnores([
      // Default ignores of eslint-config-next:
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
   ]),

   {
      plugins: {
         "unused-imports": unusedImports, // register plugin
      },

      rules: {
         // Code style
         "prefer-arrow-callback": ["warn"],
         "prefer-template": ["warn"],

         // TypeScript consistency
         "@typescript-eslint/consistent-type-imports": [
            "warn",
            {
               disallowTypeAnnotations: true,
               fixStyle: "separate-type-imports",
               prefer: "type-imports",
            },
         ],

         // Code quality
         "no-console": ["warn", { allow: ["warn", "error"] }],
         "@typescript-eslint/no-explicit-any": "warn",

         // Unused detection (via plugin)
         // Remove unused imports automatically or throw error
         "unused-imports/no-unused-imports": "warn",

         // Warn about unused vars but allow `_` prefix
         "unused-imports/no-unused-vars": [
            "warn",
            {
               vars: "all",
               varsIgnorePattern: "^_",
               args: "after-used",
               argsIgnorePattern: "^_",
            },
         ],
      },
   },
])

export default eslintConfig
