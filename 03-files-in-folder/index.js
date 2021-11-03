const { SSL_OP_COOKIE_EXCHANGE } = require('constants');
const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname,'/secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  for(let i = 0; i < files.length;i++){
    console.log(files[i]);
    console.log(files[i].isFile());
    console.log((path.extname(`${files[i].name}`)).slice(1));
  }
})