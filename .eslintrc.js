module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    // 自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parserOptions: {
    // 指定ESLint可以解析JSX语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'linebreak-style': ['off', 'windows'],
    strict: 'off',
    'valid-jsdoc': 'off',
    'no-empty-pattern': 'off',
    indent: ['error', 2], // 缩进风格
    semi: [2, 'always'], // 句尾强制分号
    eqeqeq: 2, // 要求使用 === 和 !==
    'no-alert': [2], // 禁止使用alert confirm prompt
    quotes: [2, 'single'], // 单引号
    'arrow-parens': 2, // 箭头函数用小括号括起来
    'comma-spacing': ['error', { before: false, after: true }], // 逗号前后的空格
    'no-trailing-spaces': [2], // 语句前后空格
    'key-spacing': [2, { beforeColon: false, afterColon: true }], // 对象字面量中冒号的前后空格
    'space-before-function-paren': [2, 'never'], // 函数定义时括号前面要不要有空格
    'no-unreachable': 2, // 不能有无法执行的代码
    'spaced-comment': 2, // 注释风格，//后加空格
    indent: ['error', 2], // 缩进风格
    '@typescript-eslint/semi': [2, 'always'], // 句尾强制分号
    'comma-dangle': [
      'error',
      {
        // 数组、对象逗号风格
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'import/order': [0, { 'newlines-between': 'always' }],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/display-name': 0,
    '@typescript-eslint/ban-ts-comment': 0,
  },
};
