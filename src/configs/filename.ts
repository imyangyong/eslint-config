import type { FlatESLintConfigItem } from 'eslint-define-config'
import { pluginFilename } from '../plugins'

export const filename: FlatESLintConfigItem[] = [
  {
    plugins: {
      'eslint-filename': pluginFilename,
    },
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
    },
  },
]
