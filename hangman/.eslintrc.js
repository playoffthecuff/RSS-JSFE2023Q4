module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    "import/extensions": [
      "error",
      "never",
      {
        "js": "always"
      }
    ],
    "import/prefer-default-export": [
      "off",
  ]
  },
};
