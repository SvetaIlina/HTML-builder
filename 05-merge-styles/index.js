const fsPromises = require('fs/promises');
const path = require('path');

(async function () {
  await fsPromises.writeFile(
    path.resolve(__dirname, 'project-dist', 'bundle.css'),
    '',
  );
  const files = await fsPromises.readdir(path.resolve(__dirname, 'styles'));
  const cssFiles = files.filter(
    (i) => path.extname(path.resolve(__dirname, 'styles', `${i}`)) === '.css',
  );
  for (let i = 0; i < cssFiles.length; i++) {
    const data = await fsPromises.readFile(
      path.resolve(__dirname, 'styles', `${cssFiles[i]}`),
      { encoding: 'utf8' },
    );
    await fsPromises.appendFile(
      path.resolve(__dirname, 'project-dist', 'bundle.css'),
      data,
    );
  }
})();
