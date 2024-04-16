import { ensurePackages, interopDefault } from '../utils'
import type { TypedFlatConfigItem } from '../types'

export async function filename(): Promise<TypedFlatConfigItem[]> {
  await ensurePackages([
    'eslint-plugin-filesname',
  ])

  const [
    pluginFilename,
  ] = await Promise.all([
    // @ts-expect-error missing types
    interopDefault(import('eslint-plugin-filesname')),
  ] as const)

  return [
    {
      name: 'imyangyong/filename',
      plugins: {
        filename: pluginFilename,
      },
      rules: {
        // should provide rules by yourself
        // 'eslint-filename/filename-naming-convention': [
        //   'error',
        //   {
        //     '!**/*.(vue|jsx|tsx)': ['KEBAB_CASE', 'CAMEL_CASE', 'SCREAMING_SNAKE_CASE'],
        //     '**/*.(vue|jsx|tsx)': 'PASCAL_CASE',
        //   },
        //   { ignoreMiddleExtensions: true },
        // ],
        // 'eslint-filename/folder-naming-convention': [
        //   'error',
        //   {
        //     '**/*': ['KEBAB_CASE', 'CAMEL_CASE', 'SCREAMING_SNAKE_CASE'],
        //   },
        // ],
      },
    },
  ]
}
