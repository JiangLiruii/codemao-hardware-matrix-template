const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const dist_path = './dist';
const list_js_path = './dist/list.js';
let file_list_config = {};

function generate_list_js(){
  console.log('----------------------------------');
  if(!fs.existsSync(dist_path)){
    console.log(`
[Err] path not found!
[Tip] run "yarn build:prod" first.
----------------------------------
    `);
  } else {
    if(fs.existsSync(list_js_path)){
      if(shell.rm(list_js_path).code !== 0){
        console.log('[Err] remove list.js FAILED');
        exit(1);
      }else {
        console.log('[OUT] remove list.js SUCCESS');
      }
    }

    fs.readdir(dist_path, function(err, items) {
      for (var i = 0; i < items.length; i++) {
        const ext_name = path.extname(items[i]);
        if (ext_name === '.js') {
          const basename = items[i].replace(ext_name, '');
          file_list_config[basename] = items[i];
        }
      }
      fs.writeFileSync(path.join(dist_path, 'list.js'),
      "window.MATRIX_EXT_API_LIST = " + JSON.stringify(file_list_config, null, 2));
      console.log(file_list_config);
      console.log(`
[Done] OK.
----------------------------------
      `);
    });
  }
} 

generate_list_js();
