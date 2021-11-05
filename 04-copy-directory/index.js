const fs = require('fs');
const path = require('path');
const sourceFolder = path.join(__dirname,'files');
const destinationFolder = path.join(__dirname,'files-copy');

  fs.mkdir('04-copy-directory/files-copy', {recursive:true}, (err)=>{
    if (err) console.log(`Error creating directory: ${err}`)
  })
  fs.readdir(path.join(sourceFolder), { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    for(let i = 0; i < files.length; i++){
      if(files[i].isFile()) {
        fs.copyFile(sourceFolder + '/' + files[i]['name'], destinationFolder + '/' +files[i]['name'], function(err) {
          if (err) throw err;
// console.log(files[i]['name'])
        })
      }
  }})