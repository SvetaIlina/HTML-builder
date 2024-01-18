const fs = require('fs/promises');
const path = require('path');
const origin = path.resolve(__dirname, 'files');
const copy = path.resolve(__dirname, 'files-copy');

async function copyDir(originFolder, copyFolder) {
  try {
    await fs.rm(copyFolder, {
      force: true,
      recursive: true,
    });
    await fs.mkdir(copyFolder, { recursive: true });
    const files = await fs.readdir(originFolder, { withFileTypes: true });
    for (let i = 0; i < files.length; i++) {
      const currentFile = path.join(originFolder, files[i].name);
      const copyFile = path.join(copyFolder, files[i].name);
      if (!files[i].isDirectory()) {
        await fs.copyFile(currentFile, copyFile);
      } else {
        copyDir(currentFile, copyFile);
      }
    }
  } catch (err) {
    console.log(err.message);
  }
}
// async function copyDir() {
//   try {
//     await fs.rm(path.resolve(__dirname, 'files-copy'), {
//       force: true,
//       recursive: true,
//     });
//     await fs.mkdir(path.resolve(__dirname, 'files-copy'), { recursive: true });
//     const files = await fs.readdir(path.resolve(__dirname, 'files'));
//     for (let i = 0; i < files.length; i++) {
//       await fs.copyFile(
//         path.resolve(__dirname, 'files', files[i]),
//         path.resolve(__dirname, 'files-copy', files[i]),
//       );
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
// }

copyDir(origin, copy);
