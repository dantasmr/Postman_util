const folderfiles = require('./folderfiles');
const util = require('./util');
const configedit = require('./configedit');
const deletefile = require('./deletefile');

function resetdeployments(callback) {


  let deletados = {
    "deletados": []
  };

  let resultado = {
    "status_code": 0,
    "body_result": null
  }

  configedit('deployments', function (erro, deployments_folder) {

    if (erro != null) {
      callback(util.getErrorResult(erro));
    } else {
      configedit('reset_deployments_nao_excluir', function (erro, nao_excluir) {
        if (erro != null) {
          callback(util.getErrorResult(erro));
        } else {
          const lista_naoExcluir = nao_excluir.split(',');
          console.log("deployments folder: " + deployments_folder);
          console.log("nao excluir: " + nao_excluir);
          folderfiles(deployments_folder, function (erro, files) {
            if (erro != null) {
              callback(util.getErrorResult(erro));
            } else {
              let x;
              for (x in files) {
                const arquivo = files[x];
                if (util.isDeletar(arquivo, lista_naoExcluir)) {
                  deletados['deletados'].push(arquivo);
                  const filename = deployments_folder + "/" + arquivo;
                  console.log('deletando: ' + filename);
                  deletefile(filename, (erro) => {
                    if (erro != null) {
                      console.log(erro);
                    }
                  });
                } else {
                  console.log('nao vamos deletar: ' + arquivo);
                }
              }
              resultado['status_code'] = 200;
              resultado['body_result'] = deletados;
              callback(resultado);
            }
          });
        }
      });
    }
  });
}



module.exports = resetdeployments;