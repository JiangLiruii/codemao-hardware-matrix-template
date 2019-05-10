const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

const save_path = path.join(__dirname, '../client.zip');
const unzip_path = path.join(__dirname, '..');
const extractCMD = `.\\scripts\\7z.exe x ${save_path} -o${unzip_path} -aoa -sccUTF-8`;

function unzipFile() {
  return new Promise(function (resolve, reject) {
    if(shell.exec(extractCMD).code !== 0) {
      reject('[ERR] Failed')
    }else{
      resolve('[Done] SUCCESS')
    }
  });
}

unzipFile().then((data) => {
  console.log(data);
}).catch((err) => {
  console.log(err)
});