import 'dotenv/config'; // Importa las variables de entorno desde un archivo .env
import { MongoClient } from "mongodb"; // Importa el cliente de MongoDB

/**Clase dbClient para manejar la conexión a la base de datos MongoDB.*/
class dbClient {
    constructor() {
        // Construye la cadena de conexión a la base de datos utilizando variables de entorno
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/?retryWrites=true&w=majority&appName=contenedores`;
        
        // Crea una instancia de MongoClient con la cadena de conexión
        this.client = new MongoClient(queryString);
        this.conectarBD();
    }

    /**Método para conectar a la base de datos MongoDB.Intenta establecer una conexión y asigna la base de datos a this.db.
     */
    async conectarBD() {
        try {
            // Intenta conectar al cliente de MongoDB
            await this.client.connect(); 
            
            // Asigna la base de datos 'contenedores' a this.db
            this.db = this.client.db('contenedores');
            console.log("✅ Conectado al servidor de la base de datos");
        } catch (e) {
            // Maneja cualquier error que ocurra durante la conexión
            console.log("❌ Error al conectar la base de datos:", e);
        }
    }
}

export default new dbClient();