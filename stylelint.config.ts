export default {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  overrides: [
    {
      files: ['**/*.css'],
      extends: ['stylelint-config-tailwindcss']
    },
    {
      files: ['**/*.scss'],
      plugins: ['stylelint-scss'],
      extends: ['stylelint-config-standard-scss']
    }
  ]
}
