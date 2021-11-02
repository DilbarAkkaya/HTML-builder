const fs = require('fs');
const path = require('path');
const stream = new fs.ReadStream(path.join(__dirname, '/text.txt'), 'utf8');
stream.on('readable', function(){
  const data = stream.read();
  data !== null ? console.log(data) : '';
  });
stream.on('error', function (error) {
  if(error) {
    console.log('Произошла ошибка');
  }
});
