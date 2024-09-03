import { documentosColecao } from "./dbConnect.js";

function obterDocumentos(nome = {}) {
    const documentos = documentosColecao.find(nome).toArray();
    return documentos
}

function adicionarDocumento(nome) {
    const resultado = documentosColecao.insertOne({
        nome,
        texto: ""
    })

    return resultado
}

function encontrarDocumento(nome) {
    const documento = documentosColecao.findOne({
        nome
    })

    return documento;
}

function atualizaDocumento(nome, texto) {
    const atualizacao = documentosColecao.updateOne({
        nome
    }, {
        $set: {
            texto: texto
        }
    })

    return atualizacao;
}

function excluirDocumento(nome) {
    const resultado = documentosColecao.deleteOne({
        nome
    })
    return resultado
}

export { excluirDocumento,encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento }