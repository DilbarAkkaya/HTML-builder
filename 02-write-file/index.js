const process = require('process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout } = process;
const stream = new fs.WriteStream(path.join(__dirname, 'write.txt'));
  readline.createInterface({
    input: process.stdin,
    output: process.output
});
  stdout.write('Как вас зовут?\n');
  stdin.on('data', data => {
    if(data.toString().trim() === 'exit'){
    process.exit();
  } else {
    stdout.write('Привет, ');
    stdout.write(data);
    stream.write(`${data}`)
  }
});
  process.on('SIGINT', () => {
  process.exit();
});
  process.on('exit', () => {
  console.log('До свидания');
});