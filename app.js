const http = require('http');
const render_api = require('./modules/render_api');


const servidor = http.createServer(function (request, response) {

    if (request.method === 'POST') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        request.on('end', () => {
            console.log(body);
            render_api(request, JSON.parse(body), (resposta) => {
                response.writeHead(resposta.status_code, {
                    'Content-Type': 'application/json'
                });
                response.end(JSON.stringify(resposta.body_result), 'utf-8');
            });
        });
    } else {
        render_api(request, null, (resposta) => {
            response.writeHead(resposta.status_code, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify(resposta.body_result), 'utf-8');
        });
    }
});

servidor.listen(9500);

console.log('Servidor rodando no endereco http://127.0.0.1:9500/');
console.log('Diretorio da aplicacao:' + process.cwd())

process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Erro na requisicao mas servidor mantido no ar...");
});