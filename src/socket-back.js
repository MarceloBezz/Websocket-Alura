import io from "./servidor.js";
import {
    adicionarDocumento,
    atualizaDocumento,
    encontrarDocumento,
    excluirDocumento,
    obterDocumentos
} from "./documentosDb.js";

io.on("connection", (socket) => {

    //Devolver os documentos salvos no banco para o frontend
    socket.on("obter_documentos", async (devolverDocumentos) => {
        const documentos = await obterDocumentos()
        devolverDocumentos(documentos)
    })

    //Agrupar por salas
    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento);

        const documento = await encontrarDocumento(nomeDocumento)

        if (documento) {
            devolverTexto(documento.texto);
        }

    })

    //Criação de novo documento
    socket.on("adicionar_documento", async (nome) => {
        const documentoExiste = (await encontrarDocumento(nome) !== null)

        if (documentoExiste) {
            socket.emit("documento_existente", nome)
        } else {
            const resultado = await adicionarDocumento(nome);

            if (resultado.acknowledged) {
                io.emit("adicionar_documento_interface", nome);
            }
        }

    })

    //Emitir os dados atualizados aos usuários da mesma sala
    socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto)

        if (atualizacao.modifiedCount) {
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }

    });

    //Excluir documento
    socket.on("excluir_documento", async (nome) => {
        const resultado = await excluirDocumento(nome);

        if (resultado.deletedCount) {
            io.emit("excluir_documento_sucesso", nome);
        }
    })
});