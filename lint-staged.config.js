module.exports = {
  '**/*.(ts|tsx)': () => 'npm run lint',

  '**/*.(ts|tsx|js)': (filenames) => ['npm run lint', `npx prettier --write ${filenames.join(' ')}`],
}
