const util = require('./util');
const configitem = require('./configedit');
const executaapi = require('./executaapi.js');

function cachetools(callback) {

  let resultado = {
    "status_code": 0,
    "body_result": null
  }

  configitem('cachetool', function (erro, item) {
    if (erro != null) {
      callback(util.getErrorResult(erro));
    } else {

      const dados = {
        "host": "2222",
        "file": item
      }

      const options = {
        "method": "POST",
        "host": "127.0.0.1",
        "port": "3000",
        "path": "/api/load",
        "headers": {
          "Content-Type": "application/json",
          "cache-control": "no-cache"
        }
      }

      executaapi('http', options, dados,(body_result) => {
        console.log("cachetool: " + item);
        resultado['status_code'] = 200;
        resultado['body_result'] = body_result;
        callback(resultado);
      });
    }
  });
}



module.exports = cachetools;