const fs = require('fs');

function render_content(request, callback) {

  let filePath = '';

  if (request['url'] != null && request['url'] != '') {
    filePath = '.' + request.url;
  } else {
    filePath = request.path;
  }

  console.log('Leitura do arquivo.:' + filePath);

  fs.exists(filePath, function (exists) {
    if (!exists) {
      const msg = 'arquivo nao encontrado.:' + filePath;
      console.error(msg);
      callback(msg, null);
    } else {
      fs.stat(filePath, function (error, stats) {
        if (error) {
          const msg = 'erro ao ler arquivo.:' + filePath + " :" + error.message;
          console.error(msg);
          callback(error, null);
        } else {
          fs.open(filePath, "r", function (error, fd) {
            if (error) {
              const msg = 'erro ao ler arquivo.:' + filePath + " :" + error.message;
              console.error(msg);
              callback(error, null);
            } else {
              const buffer = new Buffer(stats.size);
              fs.read(fd, buffer, 0, buffer.length, null, function (error, bytesRead, buffer) {
                if (error) {
                  const msg = 'erro ao ler arquivo.:' + filePath + " :" + error.message;
                  console.error(msg);
                  callback(error, null);
                } else {
                  const data = buffer.toString("utf8", 0, buffer.length);
                  fs.close(fd);
                  callback(null, data);
                }
              });
            }
          });
        }
      });
    }
  });
}

module.exports = render_content;