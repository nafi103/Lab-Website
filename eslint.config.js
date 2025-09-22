import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// ESLint configuration - keeping my code clean and consistent
// I'm using recommended configs with React-specific rules
export default defineConfig([
  globalIgnores(['dist']), // Don't lint the build output
  {
    files: ['**/*.{js,jsx}'], // Apply to all JavaScript and JSX files
    extends: [
      js.configs.recommended, // Basic JavaScript linting rules
      reactHooks.configs['recommended-latest'], // React hooks best practices
      reactRefresh.configs.vite, // Hot reload compatibility
    ],
    languageOptions: {
      ecmaVersion: 2020, // Modern JavaScript features
      globals: globals.browser, // Browser environment globals
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
