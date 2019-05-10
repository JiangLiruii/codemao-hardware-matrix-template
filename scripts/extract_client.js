const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

const save_path = path.join(__dirname, '../client.zip');
const unzip_path = path.join(__dirname, '../');
const extractCMD_win32 = `.\\scripts\\7z.exe x ${save_path} -o${unzip_path} -aoa -sccUTF-8`;
const extractCMD_darwin = `unzip -qo ${save_path}`;

function unzipFile() {
  return new Promise((resolve, reject) => {
    if(shell.exec(process.platform === 'win32' ? extractCMD_win32 : extractCMD_darwin).code !== 0) {
      reject('[ERR] Failed');
    }else{
      resolve('[Done] SUCCESS');
    }
  });
}

unzipFile().then((data) => {
  console.log('\r\n' + data);
}).catch((err) => {
  console.log('\r\n' + err);
});