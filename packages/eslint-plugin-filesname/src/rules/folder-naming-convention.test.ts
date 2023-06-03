import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint'
import { it } from 'vitest'
import rule, { RULE_NAME, type MessageIds, type Options } from './folder-naming-convention'

const valids = [
  {
    code: "var foo = 'bar';",
    filename: 'src/components/DisplayLabel/__tests__/displayLabel.test.js',
    options: [{ '*/__tests__/': 'PASCAL_CASE', 'src/*/': 'CAMEL_CASE' }],
  },
] as const

const invalids = [
  {
    code: "var foo = 'bar';",
    filename: 'src/Components/DisplayLabel/__tests__/displayLabel.test.js',
    options: [{ '*/__tests__/': 'PASCAL_CASE', 'src/*/': 'CAMEL_CASE' }],
    errors: [
      {
        message:
          'The folder "Components" does not match the "CAMEL_CASE" pattern',
        column: 1,
        line: 1,
      },
    ],
  },
  {
    code: "var foo = 'bar';",
    filename: 'src/components/displayLabel/__tests__/displayLabel.test.js',
    options: [{ '*/__tests__/': 'PASCAL_CASE', 'src/*/': 'CAMEL_CASE' }],
    errors: [
      {
        message:
          'The folder "displayLabel" does not match the "PASCAL_CASE" pattern',
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
