const render_content = require('./render_content.js');
const util = require('./util.js');

function configedit(item, callback) {

  const request = {
    "url": "/config/configuracao.json"
  }

  render_content(request, function (error, content) {

    if (error != null) {
      callback(error, null);
    } else {
      const config = JSON.parse(content);
      callback(null, util.getItemLista(config, item));
    }
  });
}

module.exports = configedit;