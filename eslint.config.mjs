import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.config.*',
            '**/scripts/**',
            'eslint.config.*',
            'postcss.config.*',
            'tailwind.config.*',
            'vitest.config.*',
          ],
        },
      ],
    },
  },
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '**/*.d.ts',
      'eslint.config.mjs',
      '**/*.config.mjs',
      'playwrite-ui'
    ],
  },
  prettier,
  eslintPluginPrettierRecommended,
])
