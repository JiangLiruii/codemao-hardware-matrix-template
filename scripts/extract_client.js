const path = require('path');
const fs = require('fs');
const unzip = require('unzip-stream');
const shell = require('shelljs');

// TODO，解压过程可能有中文编码问题
function unzipFile(payload) {
  console.log('开始解压');
  return new Promise(function (resolve, reject) {
    if (fs.existsSync(payload.save_path)) {
      fs.createReadStream(payload.save_path)
        .on('error', function (err) {
          reject(err);
        })
        .on('end', function () {
          if (fs.existsSync(payload.unzip_path)) {

            if (process.platform !== 'win32') {
              shell.exec("chmod -R 755 " + payload.unzip_path);
            }
            resolve('解压完成');
          } else {
            console.log('文件不存在');
          }
        })
        .pipe(unzip.Extract({ path: payload.unzip_path }));
    } else {
      reject('解压错误');
    }
  });
}

unzipFile(
  {
    save_path: path.join(__dirname, '../client.zip'),
    unzip_path: path.join(__dirname, '..'),
  }
).then((data) => {
  console.log(data);
}).catch((err) => {
  throw err;
});