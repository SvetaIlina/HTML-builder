const fs = require('fs');
const path = require('path');

fs.readdir(
  path.resolve(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (err, data) => {
    if (err) return console.log(err);
    const files = data.filter((item) => item.isFile() === true);
    files.forEach((item) => {
      fs.stat(path.join(item.path, item.name), (err, stats) => {
        if (err) return console.log(err.message);
        console.log(
          `${item.name.split('.')[0]} - ${path.extname(item.name).slice(1)} - ${
            stats.size
          }b`,
        );
      });
    });
  },
);
