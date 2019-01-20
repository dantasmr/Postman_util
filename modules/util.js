const {
  StringDecoder
} = require('string_decoder');
const decoder = new StringDecoder('utf8');

exports.getItemLista = function (lista, nome) {

  const arrayLength = lista.length;
  for (let i = 0; i < arrayLength; i++) {
    const item = lista[i];
    if (item.nome == nome) {
      return item.valor;
    }
  }
  return null;
}

exports.getConectionInfo = function (dados) {

  console.log(dados);
  const lista = dados.split(":");
  const port_url = lista[2].split("/");

  const resu = {
    "request": lista[0],
    "host": lista[1].replace("//", ""),
    "port": port_url[0],
    "path": port_url[1]
  }
  return resu;
}

exports.parseContentType = function (contentType, conteudo) {

  if (contentType.indexOf("utf-8") > -1) {
    return decoder.write(conteudo);
  } else if (contentType.indexOf("text/html") > -1) {
    return conteudo;
  } else if (contentType.indexOf("json") > -1) {
    return JSON.parse(conteudo);
  }
}

exports.getParteDireitaString = function (parte, texto) {
  const posi = texto.indexOf(parte);
  return texto.substring(posi + parte.length, texto.length);
}

exports.getParteEsquerdaString = function (parte, texto) {
  const posi = texto.indexOf(parte);
  return texto.substring(0, posi);
}

exports.getBarraArquivo = function () {
  const tipoBarra = process.cwd();
  return (tipoBarra.indexOf("/") != -1) ? "/" : "\\";
}

exports.isDeletar = function (item, naoexcluir) {

  if (item.indexOf('.war') < 0) {
    return false;
  } else {
    if (Array.isArray(naoexcluir)) {
      if (naoexcluir.includes(item)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}