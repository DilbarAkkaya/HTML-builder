const fs = require('fs');
const path = require('path');
const sourceFolder = path.join(__dirname,'styles');

  fs.readdir(path.join(sourceFolder), { withFileTypes: true }, (err, files) => { //чтение содержимого папки styles
    if (err) throw err;
    for(let i = 0; i < files.length; i++){
      if(files[i].isFile() && (path.parse(files[i]['name'])['ext']) === '.css') {  //проверка на файл и на расширение

        const stream = new fs.ReadStream(path.join(sourceFolder + '/' + files[i]['name']), 'utf8'); //чтение файлов css
        stream.on('data', function(data){
          const streamWr = new fs.appendFile((path.join(__dirname, 'project-dist', 'bundle.css')), data, (err) => {//запись
            if (err) throw err;
          }) 
        })
      }
    }
  })
