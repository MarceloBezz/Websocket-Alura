import "dotenv/config";
import express from "express";
import url from "url"
import path from "path"
import http from "http"
import { Server } from "socket.io"
import "./dbConnect.js"

//Inicialização do Express
const app = express();
const porta = process.env.PORTA || 3000

//Acesso ao diretório estático
const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual,"../../" ,"public")

//Middleware de manipulação de arquivos estáticos
app.use(express.static(diretorioPublico))

const servidorHttp = http.createServer(app)

servidorHttp.listen(porta, () => {
    console.log(`Servidor escutando na porta ${porta}!`);
})

//Servidor Socket.io
const io = new Server(servidorHttp)

export default io;