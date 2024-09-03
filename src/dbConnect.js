import { MongoClient } from "mongodb";

const cliente = new MongoClient(process.env.DB_CONNECTION_STRING)

let documentosColecao;

try {
    await cliente.connect() //Conexão com o cluster

    const db = cliente.db(process.env.DATABASE_NAME) //conexão com o banco de dados
    documentosColecao = db.collection(process.env.COLLECTION_NAME) //conexão com a coleção

    console.log("Conectado ao banco de dados com sucesso");
} catch (error) {
    console.log(error);
    
}

export { documentosColecao }