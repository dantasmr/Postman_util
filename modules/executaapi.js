const qs = require("querystring");
const https = require("https");
const http = require("http");

function executaapi(request, options, dados, callback) {

  let tmp_http = (request == "https") ? https : http;

  let resultado = {
    status: 0,
    conteudo: null
  }

  try {

    const req = tmp_http.request(options, function (res) {

      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        resultado['status'] = res.statusCode;
        resultado['conteudo'] = body.toString();
        callback(resultado);
      });
    });

    const POSTJSONString = JSON.stringify(dados);
    const HTTPBody = Buffer.from(POSTJSONString, "utf8");
    req.write(HTTPBody);
    req.end();


  } catch (error) {
    console.error('Erro ao pesquisar API: ' + error.message);
    callback(resultado);
  }

}

module.exports = executaapi;