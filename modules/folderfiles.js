const fs = require('fs');

function folderfiles(folder, callback) {
  fs.readdir(folder, (err, files) => {
    if (err != null) {
      console.log("Erro folderfiles: " + folder + err.message);
      callback(err, files);
    } else {
      callback(null, files);
    }
  });
}

module.exports = folderfiles;