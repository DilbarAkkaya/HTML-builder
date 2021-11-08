const fs = require('fs');
const path = require('path');
const sourceTemplate = path.join(__dirname, 'template.html');
const dest = path.join(__dirname, 'project-dist', 'index.html');
const components = path.join(__dirname, 'components');
const fspromise = require('fs').promises;

async function deleteDir(){
  await fspromise.rm('06-build-page/project-dist', {
    recursive: true, force: true
  }, (err) => { if (err) throw err;
  })
}

async function createDir() {
 await fspromise.mkdir('06-build-page/project-dist', {
    recursive: true
  }, (err) => {
    if (err) console.log(`Error creating directory: ${err}`)
  })
  await fs.copyFile(sourceTemplate, dest, function (err) {
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
async function createScc(){
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
}

async function copyDir(srcAssets, destAssets) {
 const entries = await fspromise.readdir(srcAssets, {withFileTypes: true});
await fspromise.mkdir(destAssets);
for(let entry of entries) {
  const srcPath = path.join(srcAssets, entry.name);
  const destPath = path.join(destAssets, entry.name);
  if (entry.isDirectory()) {
    await copyDir(srcPath, destPath);
  } else {
    await fspromise.copyFile(srcPath, destPath);
  }
}
}
async function build() {
  await deleteDir();
  await createDir();
  await replaceComponents();
  await copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
  await createScc();
}
build();