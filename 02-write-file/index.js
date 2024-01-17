const { stdin, stdout } = process;
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const rl = readline.createInterface(stdin, stdout);

fs.writeFile(path.resolve(__dirname, 'text.txt'), '', (err) => {
  if (err) console.log(err.message);
});

rl.setPrompt('Welcome, please enter the text \n');
rl.prompt();
rl.on('line', (data) => {
  if (data.includes('exit')) {
    rl.close();
    return;
  }
  fs.appendFile(path.resolve(__dirname, 'text.txt'), `${data}\n`, (err) => {
    if (err) console.log(err.message);
  });
});

rl.on('close', () => console.log('Goodbye'));

// stdout.write('Welcome, please enter the text \n');
// stdin.on('data', (data) => {
//   const myData = `${data}`;
//   if (myData.trim() == 'exit') {
//     process.exit();
//   } else {
//     fs.appendFile(path.resolve(__dirname, 'text.txt'), myData, (err) => {
//       if (err) console.log(err.message);
//     });
//   }
// });

// process.on('exit', () => console.log('Goodbye!'));
// process.on('SIGINT', () => {
//   process.exit();
// });
