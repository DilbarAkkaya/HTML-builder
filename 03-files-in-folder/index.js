const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname,'/secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  for(let i = 0; i < files.length; i++){
    if(files[i].isFile()) {
     //console.log((path.parse(files[i]['name'])['name']) + ' - ' + path.parse(files[i]['name'])['ext'].slice(1));
     path.parse(files[i]['name'])['name'] + ' - ' + path.parse(files[i]['name'])['ext'].slice(1);
     fs.stat(path.join(__dirname, 'secret-folder', files[i]['name']), (err, data) => {
        if (err) throw err;
        console.log((path.parse(files[i]['name'])['name']) + ' - ' + path.parse(files[i]['name'])['ext'].slice(1) + ' - ' + data.size + 'b');
      } )   
    }
}})