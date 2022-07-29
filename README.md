# @imyangyong/eslint-config

[![npm](https://img.shields.io/npm/v/@imyangyong/eslint-config?color=a1b858&label=)](https://npmjs.com/package/@imyangyong/eslint-config)

- Single quotes, no semi
- Auto fix for formatting (aimed to be used standalone without Prettier)
- TypeScript, Vue, React out-of-box
- Lint also for json, yaml, markdown
- Sorted imports, dangling commas for cleaner commit diff
- Reasonable defaults, best practices, only one-line of config

## Usage

### Install

```bash
pnpm add -D eslint @imyangyong/eslint-config
```

### Config `.eslintrc`

```json
{
  "extends": [
    "@imyangyong"
  ]
}
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

### Config VS Code auto fix

Create `.vscode/settings.json`

```json
{
  "prettier.enable": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## License

[MIT](./LICENSE) License &copy; 2019-PRESENT [Yong Yang](https://github.com/imyangyong)
