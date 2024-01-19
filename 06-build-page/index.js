const fsPromises = require('fs/promises');
const path = require('path');

const dist = path.resolve(__dirname, 'project-dist');
const styleFolder = path.resolve(__dirname, 'styles');
const assetsFolder = path.resolve(__dirname, 'assets');
const copyAssetsFolder = path.resolve(dist, 'assets');
const compFolder = path.resolve(__dirname, 'components');
const template = path.resolve(__dirname, 'template.html');

async function mergeStyle() {
  const files = await fsPromises.readdir(styleFolder);
  const cssFiles = files.filter(
    (i) => path.extname(path.resolve(styleFolder, `${i}`)) === '.css',
  );
  for (let i = 0; i < cssFiles.length; i++) {
    const data = await fsPromises.readFile(
      path.resolve(styleFolder, `${cssFiles[i]}`),
      { encoding: 'utf8' },
    );
    await fsPromises.appendFile(path.resolve(dist, 'style.css'), data);
  }
}

async function copyDir(originFolder, copyFolder) {
  await fsPromises.rm(copyFolder, {
    force: true,
    recursive: true,
  });
  await fsPromises.mkdir(copyFolder, { recursive: true });
  const files = await fsPromises.readdir(originFolder, { withFileTypes: true });
  for (let i = 0; i < files.length; i++) {
    const currentFile = path.join(originFolder, files[i].name);
    const copyFile = path.join(copyFolder, files[i].name);
    if (!files[i].isDirectory()) {
      await fsPromises.copyFile(currentFile, copyFile);
    } else {
      copyDir(currentFile, copyFile);
    }
  }
}

async function replaceTemplate() {
  let html = await fsPromises.readFile(template, 'utf-8');
  const components = await fsPromises.readdir(compFolder, 'utf-8');
  for (let i = 0; i < components.length; i++) {
    const compContent = await fsPromises.readFile(
      path.join(compFolder, components[i]),
      'utf-8',
    );
    const compName = path.basename(
      path.join(compFolder, components[i]),
      path.extname(components[i]),
    );
    html = html.replace(`{{${compName}}}`, compContent);
  }
  return html;
}

async function createHtml() {
  const layout = await replaceTemplate();
  await fsPromises.writeFile(path.join(dist, 'index.html'), layout);
}

async function createFolder() {
  await fsPromises.rm(dist, {
    force: true,
    recursive: true,
  });
  await fsPromises.mkdir(dist, { recursive: true });
  mergeStyle();
  copyDir(assetsFolder, copyAssetsFolder);
  createHtml();
}

createFolder();
