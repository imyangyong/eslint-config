import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint'
import { it } from 'vitest'
import rule, { type MessageIds, type Options, RULE_NAME } from './filename-blocklist'

const valids = [
  {
    code: 'var foo = \'bar\';',
    filename: 'src/foo.model.ts',
    options: [
      {
        '*.models.ts': '*.model.ts',
        '*.utils.ts': '*.util.ts',
      },
    ],
  },
  {
    code: 'var foo = \'bar\';',
    filename: 'src/foo.util.ts',
    options: [
      {
        '*.models.ts': '*.model.ts',
        '*.utils.ts': '*.util.ts',
      },
    ],
  },
  {
    code: 'var foo = \'bar\';',
    filename: 'src/foo.apis.ts',
    options: [
      {
        '*.models.ts': '*.model.ts',
        '*.utils.ts': '*.util.ts',
      },
    ],
  },
] as const

const invalids = [
  {
    code: 'var foo = \'bar\';',
    filename: 'src/foo.models.ts',
    options: [
      {
        '*.models.ts': '*.model.ts',
        '*.utils.ts': '*.util.ts',
      },
    ],
    errors: [
      {
        message:
          'The filename "foo.models.ts" matches the blocklisted "*.models.ts" pattern, use a pattern like "*.model.ts" instead',
        column: 1,
        line: 1,
      },
    ],
  },
  {
    code: 'var foo = \'bar\';',
    filename: 'src/foo.utils.ts',
    options: [
      {
        '*.models.ts': '*.model.ts',
        '*.utils.ts': '*.util.ts',
      },
    ],
    errors: [
      {
        message:
          'The filename "foo.utils.ts" matches the blocklisted "*.utils.ts" pattern, use a pattern like "*.util.ts" instead',
        column: 1,
        line: 1,
      },
    ],
  },
] as const

it('runs', () => {
  const ruleTester: RuleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
  })

  ruleTester.run<MessageIds, Options>(RULE_NAME, rule, {
    valid: valids,
    // @ts-expect-error message way instead of messageId
    invalid: invalids,
  })
})