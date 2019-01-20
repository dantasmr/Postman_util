
const cachetools = require('./cachetools.js');
const resetdeployments = require('./resetdeployments.js');

function render_api(request, body, callback) {

  const api = request.headers['api'];

  if (api == 'cachetool'){
    cachetools((resultado)=>{
      callback(resultado);
    });
  }else if (api == 'resetdeployments'){
    resetdeployments((resultado)=>{
      callback(resultado);
    });
  }
}

module.exports = render_api;