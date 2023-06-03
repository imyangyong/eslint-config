import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint'
import { it } from 'vitest'
import rule, { RULE_NAME, type MessageIds, type Options } from './folder-match-with-fex'

const valids = [
  {
    code: "var foo = 'bar';",
    filename: '/__tests__/foo.test.js',
    options: [{ '*.js': '**/__tests__/' }],
  },
  {
    code: "var foo = 'bar';",
    filename: '__tests__/foo.test.js',
    options: [{ '*.js': '**/__tests__/' }],
  },
  {
    code: "var foo = 'bar';",
    filename: 'bar/__tests__/foo.test.js',
    options: [{ '*.js': '**/__tests__/' }],
  },
  {
    code: "var foo = 'bar';",
    filename: '/bar/__tests__/foo.test.js',
    options: [{ '*.js': '**/__tests__/' }],
  },
] as const

const invalids = [
  {
    code: "var foo = 'bar';",
    filename: '/bar/__test__/foo.test.js',
    options: [{ '*.js': '**/__tests__/' }],
    errors: [
      {
        message:
          'The folder of the file "/bar/__test__/foo.test.js" does not match the "**/__tests__/" pattern',
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
