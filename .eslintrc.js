module.exports = {
  env: {
    es6: true,
    browser: true,
    node: 1,
  },

  plugins: ["babel", "import", "jsx-a11y"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    requireConfigFile: false,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    quotes: ["error", "double", { avoidEscape: true }],
    "no-underscore-dangle": 0,
    "no-plusplus": 0,
    "arrow-body-style": 0,
    "prefer-destructuring": 0,
    "no-unused-expressions": 0,
    camelcase: 0,

    "consistent-return": 0, //Отключаем для этого проекта
    "linebreak-style": "off", // Неправильно работает в Windows.
    "arrow-parens": "off", // Несовместимо с prettier
    "object-curly-newline": "off", // Несовместимо с prettier
    "no-mixed-operators": "off", // Несовместимо с prettier
    "function-paren-newline": "off", // Несовместимо с prettier
    "space-before-function-paren": 0, // Несовместимо с prettier
    "max-len": ["error", 100, 2, { ignoreUrls: true }], // airbnb позволяет некоторые пограничные случаи
    "no-console": 1, // airbnb использует предупреждение
    "no-alert": 1, // airbnb использует предупреждение

    "jsx-a11y/anchor-is-valid": [
      "error",
      { components: ["Link"], specialLink: ["to"] },
    ],
    "jsx-a11y/label-has-for": [
      2,
      {
        required: {
          every: ["id"],
        },
      },
    ], // для ошибки вложенных свойств htmlFor элементов label
  },
};
