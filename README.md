# @imyangyong/eslint-config

[![npm](https://img.shields.io/npm/v/@imyangyong/eslint-config?color=444&label=)](https://npmjs.com/package/@imyangyong/eslint-config) [![code style](https://imyangyong.me/badge-code-style.svg)](https://github.com/imyangyong/eslint-config)

- Single quotes, no semi
- Auto fix for formatting (aimed to be used standalone **without** Prettier)
- Designed to work with TypeScript, Vue out-of-box
- Lints also for json, yaml, markdown
- Sorted imports, dangling commas
- Reasonable defaults, best practices, only one-line of config
- Respects `.gitignore` by default
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Using [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
- **Style principle**: Minimal for reading, stable for diff, consistent

> [!IMPORTANT]
> The main branch is for v1.0-beta, which rewrites to ESLint Flat config, check [#250](https://github.com/imyangyong/eslint-config/pull/250) for more details.

## Usage

### Install

```bash
pnpm add -D eslint @imyangyong/eslint-config
```

### Create config file

```js
// eslint.config.js
import imyangyong from '@imyangyong/eslint-config'

export default imyangyong()
```

> You don't need `.eslintignore` normally as it has been provided by the preset.

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## VS Code support (auto fix)

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `settings.json`:

```jsonc
{
  // Enable the flat config support
  "eslint.experimental.useFlatConfig": true,

  // Disable the default formatter
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "@stylistic/*", "severity": "off" },
    { "rule": "style*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // The following is optional.
  // It's better to put under project setting `.vscode/settings.json`
  // to avoid conflicts with working with different eslint configs
  // that does not support all formats.
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml"
  ]
}
```

## Customization

Since v1.0, we migrated to [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), provides a much better organization and composition.

Normally you only need to import the `imyangyong` preset:

```js
// eslint.config.js
import imyangyong from '@imyangyong/eslint-config'

export default imyangyong()
```

You can configure each feature individually, for example:

```js
// eslint.config.js
import imyangyong from '@imyangyong/eslint-config'

export default imyangyong({
  stylistic: true, // enable stylistic formatting rules
  typescript: true,
  vue: true,
  jsonc: false,
  yml: false,
  filename: true,
})
```

The `imyangyong` factory functions also accepts arbitrary numbers of constom configs overrides:

```js
// eslint.config.js
import imyangyong from '@imyangyong/eslint-config'

export default imyangyong(
  {
    // Configures for imyangyong's config
  },

  // From the second arguments they are ESLint Flat Configs
  // you can have multiple configs
  {
    rules: {},
  },
  {
    rules: {},
  },
)
```

Going more advanced, you can also import the very fine-grained configs and compose them as you wish:

```js
// eslint.config.js
import {
  comments,
  ignores,
  imports,
  javascript,
  javascriptStylistic,
  jsdoc,
  jsonc,
  markdown,
  node,
  sortPackageJson,
  sortTsconfig,
  typescript,
  typescriptStylistic,
  unicorn,
  vue,
  yml,
} from '@imyangyong/eslint-config'

export default [
  ...ignores,
  ...javascript(),
  ...comments,
  ...node,
  ...jsdoc,
  ...imports,
  ...unicorn,
  ...javascriptStylistic,

  ...typescript(),
  ...typescriptStylistic,

  ...vue(),
  ...jsonc,
  ...yml,
  ...markdown(),
]
```

Check out the [configs](https://github.com/imyangyong/eslint-config/blob/main/src/configs) and [factory](https://github.com/imyangyong/eslint-config/blob/main/src/factory.ts) for more details.


## Plugins Renaming

Since flat config requires us to explicitly provide the plugin names (instead of mandatory convention from npm package name), we renamed some plugins to make overall scope more consistent and easier to write.

| Original Prefix | New Prefix | Source Plugin |
| --------------- | ---------- | ------------- |
| `i/*` | `import/*` | [eslint-plugin-i](https://github.com/un-es/eslint-plugin-i) |
| `n/*` | `node/*` | [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n)
| `@typescript-eslint/*` | `ts/*` | [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) |
| `@stylistic/*` | `style/*` | [@stylistic/eslint-plugin](https://github.com/eslint-stylistic/eslint-stylistic) |

When you want to overrides rules, or disable them inline, you need to update to the new prefix:

```diff
-// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
+// eslint-disable-next-line ts/consistent-type-definitions
type foo = { bar: 2 }
```

### Type Aware Rules

You can optionally enable the [type aware rules](https://typescript-eslint.io/linting/typed-linting/) by passing the options object to the `typescript` config:

```js
// eslint.config.js
import imyangyong from '@imyangyong/eslint-config'

export default imyangyong({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
})
```

### Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`:

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

and then

```bash
npm i -D lint-staged simple-git-hooks
```

## Badge

If you enjoy this code style, and would like to mention it in your project, here is the badge you can use:

```md
[![code style](https://imyangyong.me/badge-code-style.svg)](https://github.com/imyangyong/eslint-config)
```

[![code style](https://imyangyong.me/badge-code-style.svg)](https://github.com/imyangyong/eslint-config)

## License

[MIT](./LICENSE) License &copy; 2019-PRESENT [Yong Yang](https://github.com/imyangyong)
