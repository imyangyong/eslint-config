import { pluginFilename } from '../plugins'
import type { FlatESLintConfigItem, OptionsOverrides } from '../types'

export function filename(options: OptionsOverrides = {}): FlatESLintConfigItem[] {
  const {
    overrides = {},
  } = options

  return [
    {
      name: 'imyangyong:filename',
      plugins: {
        'eslint-filename': pluginFilename,
      },
    },
    {
      name: 'imyangyong:filename:rules',
      rules: {
        'eslint-filename/filename-naming-convention': [
          'error',
          {
            '!**/*.(vue|jsx|tsx)': ['KEBAB_CASE', 'CAMEL_CASE', 'SCREAMING_SNAKE_CASE'],
            '**/*.(vue|jsx|tsx)': 'PASCAL_CASE',
          },
          { ignoreMiddleExtensions: true },
        ],
        'eslint-filename/folder-naming-convention': [
          'error',
          {
            '**/*': ['KEBAB_CASE', 'CAMEL_CASE', 'SCREAMING_SNAKE_CASE'],
          },
        ],
        ...overrides,
      },
    },
  ]
}
