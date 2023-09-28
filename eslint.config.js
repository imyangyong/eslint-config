import sortKeys from 'eslint-plugin-sort-keys'
import imyangyong from '@imyangyong/eslint-config'

export default imyangyong(
  {
    ignores: [
      'fixtures',
      '_fixtures',
    ],
    // typescript: {
    //   tsconfigPath: 'tsconfig.json',
    // },
  },
  {
    files: ['src/**/*.ts'],
    plugins: {
      'sort-keys': sortKeys,
    },
    rules: {
      'sort-keys/sort-keys-fix': 'error',
    },
  },
)
