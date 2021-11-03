const process = require('process');
const fs = require('fs');
const path = require('path');
const stream = new fs.WriteStream(path.join(__dirname, '/write.txt'));
stream.write('kjhhgfgdgrsfeaeASDKU12666');
const readline = require('readline').createInterface({
input: process.stdin,
output: process.output
})
const { stdin, stdout } = process;
stdout.write('Как тебя зовут?\n');
stdin.on('data', data => {
  stdout.write('Привет, ');
  stdout.write(data);
  process.exit();
});
process.on('exit', code => {
  if (code === 0) {
      stdout.write('Всё в порядке');
  } else {
      stderr.write(`Что-то пошло не так. Программа завершилась с кодом ${code}`);
  }
});