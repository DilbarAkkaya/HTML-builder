const fs = require('fs');
const path = require('path');
const sourceTemplate = path.join(__dirname, 'template.html');
const dest = path.join(__dirname, 'project-dist', 'index.html');
const components = path.join(__dirname, 'components');

function createDir() {
  fs.mkdir('06-build-page/project-dist', {
    recursive: true
  }, (err) => { //создаем папку project-dist
    if (err) console.log(`Error creating directory: ${err}`)
  })
  fs.copyFile(sourceTemplate, dest, function (err) {
    if (err) throw err;
  })
}
async function replaceComponents() {
  let arr = [];
  let arrayOfTags = [];
  const stream = fs.promises.readFile(sourceTemplate, 'utf8');
  let index = await stream

  fs.readdir(components, {
    withFileTypes: true
  }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      arrayOfTags.push(path.parse(file.name).name);
      const filePath = path.join(components, file.name)
      let fileComponent = fs.promises.readFile(filePath, 'utf8');
      arr.push(fileComponent);
    });

    Promise.all(arr).then(file => {
      file.forEach((item, i) => {
        index = index.replace(`{{${arrayOfTags[i]}}}`, item)
      })
      fs.writeFile(dest, index, (err) => {
        if (err) throw err;
      })
    })
  })
}
async function build() {
  createDir();
  await replaceComponents();
}
build();


const sourceFolder = path.join(__dirname,'styles');

  fs.readdir(path.join(sourceFolder), { withFileTypes: true }, (err, files) => { //чтение содержимого папки styles
    if (err) throw err;
    for(let i = 0; i < files.length; i++){
      if(files[i].isFile() && (path.parse(files[i]['name'])['ext']) === '.css') {  //проверка на файл и на расширение

        const stream = new fs.ReadStream(path.join(sourceFolder + '/' + files[i]['name']), 'utf8'); //чтение файлов css
        stream.on('data', function(data){
          const streamWr = new fs.appendFile((path.join(__dirname, 'project-dist', 'style.css')), data, (err) => {//запись
            if (err) throw err;
          }) 
        })
      }
    }
  })
