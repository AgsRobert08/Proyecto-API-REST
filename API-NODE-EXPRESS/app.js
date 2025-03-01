import 'dotenv/config';
import express from 'express';
import cors from 'cors'; 
import routesReportes from './routes/reportes.js';
import bodyParser from 'body-parser';

const app = express();

// Habilitar CORS para todas las rutas
app.use(cors());

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/reportes', routesReportes);

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(" ✅ Servidor activo en el puerto " + PORT));
} catch (e) {
    console.error(e);
}