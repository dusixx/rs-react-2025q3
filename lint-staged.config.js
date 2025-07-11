/* eslint-env node */
export default {
  '*': ['npm run format'],
  '*.{js,jsx,ts,tsx}': ['npm run lint:fix'],
  '*.{scss,css}': ['npm run stylelint:fix'],
};
