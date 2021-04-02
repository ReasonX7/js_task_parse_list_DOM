module.exports = {
  extends: ['@mate-academy/eslint-config', 'plugin:cypress/recommended'],
  rules: {
    'max-len': ["error", { "code": 120 }],
  },
};
