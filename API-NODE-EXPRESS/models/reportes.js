import dbClient from "../config/dbClient.js";
import { ObjectId } from "mongodb";

class reportesModel {
    async create(reporte) {
        const collReportes = dbClient.db.collection('registros');
        return await collReportes.insertOne(reporte);
    }

    async update(id, reporte) {
        const collReportes = dbClient.db.collection('registros');
        return await collReportes.updateOne({ id: new ObjectId(id) }, { $set: reporte})
    }
    
    async delete(id) {
        const collReportes = dbClient.db.collection('registros');
        try {
            // Verifica si el ID es un ObjectId válido
            if (!ObjectId.isValid(id)) {
                throw new Error('ID no válido');
            }
            const result = await collReportes.deleteOne({ _id: new ObjectId(id) });
            return result; 
        } catch (error) {
            throw new Error('Error al eliminar el registro: ' + error.message);
        }
    }

    async getAll() {
        const collReportes = dbClient.db.collection('registros');
        return await collReportes.find({}).toArray();
    }

    async getOne(id) {
        const collReportes = dbClient.db.collection('registros');
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error('ID no válido');
            }
            return await collReportes.findOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw new Error('Error al buscar el registro: ' + error.message);
        }
    }
}

export default new reportesModel();