const request = require('request');
const fs = require('fs');
const ProgressBar = require('progress');

const download_url = 'https://public-static-edu.codemao.cn/matrix/public/client_for_template.zip?' + Math.random();

function downloadFile(option) {
  const req = request({
    method: 'GET',
    uri: download_url,
  });
  let out;
  let bar;

  try {
    out = fs.createWriteStream(option.save_path);
  } catch (error) {
    req.abort();
  }

  try {
    req.pipe(out);
  } catch (error) {
    out.close();
    req.abort();
  }

  req.on('response', function (data) {
    totalBytes = parseInt(data.headers['content-length'], 10);
    bar = new ProgressBar('正在下载编程猫离线客户端 [:bar] :rate/bps :percent :etas', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: totalBytes,
    });
  });
  req.on('data', function (chunk) {
    bar.tick(chunk.length);
  });
  req.on('end', function () {
    console.log('下载完成');
  });
  req.on('error', function (error) {
    console.error('下载出错');
  });
}

downloadFile({
  save_path: './client.zip',
});
