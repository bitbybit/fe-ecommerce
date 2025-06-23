export default {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  overrides: [
    {
      files: ['**/*.css'],
      extends: ['stylelint-config-tailwindcss'],
      rules: {
        'at-rule-no-deprecated': [
          true,
          {
            ignoreAtRules: ['apply']
          }
        ]
      }
    },
    {
      files: ['**/*.scss'],
      plugins: ['stylelint-scss'],
      extends: ['stylelint-config-standard-scss']
    }
  ]
}
