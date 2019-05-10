var fs = require('fs');
var path = require('path');

const dist_path = './dist';
const list_path_win32 = './client/build/asset/hardware/matrix/';
const list_path_darwin = './client/源码智造编辑器.app/Contents/Resources/app.nw/build/asset/hardware/matrix/';

function flash_client_list_js() {
  console.log('----------------------------------');
  if (!fs.existsSync(dist_path)) {
    console.log(`
[Err] path not found!
[Tip] run "yarn build:prod" first.
----------------------------------
`);
  } else {
    fs.readdir(dist_path, function (err, items) {
      if (err) {
        console.log('[Err] Failed.')
      } else {
        for (let i = 0; i < items.length; i++) {
          fs.createReadStream(path.join(dist_path, items[i]))
            .pipe(fs.createWriteStream(
              path.join(process.platform === 'win32' ? list_path_win32 : list_path_darwin, items[i])
            ));
        }
      }
    });
  }
}

flash_client_list_js();