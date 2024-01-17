const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  try {
    await fs.rm(path.resolve(__dirname, 'files-copy'), {
      force: true,
      recursive: true,
    });
    await fs.mkdir(path.resolve(__dirname, 'files-copy'), { recursive: true });
    const files = await fs.readdir(path.resolve(__dirname, 'files'));
    for (let i = 0; i < files.length; i++) {
      await fs.copyFile(
        path.resolve(__dirname, 'files', files[i]),
        path.resolve(__dirname, 'files-copy', files[i]),
      );
    }
  } catch (err) {
    console.log(err.message);
  }
}

copyDir();
