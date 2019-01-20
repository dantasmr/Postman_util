const fs = require('fs');

function deletefile(filename, callback) {
  fs.stat(filename, function (err, stats) {
    if (err) {
      callback(err);
    } else {
      fs.unlink(filename, function (err) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }
  });
}

module.exports = deletefile;