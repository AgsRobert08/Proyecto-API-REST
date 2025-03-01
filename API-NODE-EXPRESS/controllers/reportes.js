import reportesModel from '../models/reportes.js';

/**Controlador para la gestión de reportes. 
 * Proporciona métodos CRUD para interactuar con el modelo reportesModel. */
class reportesController {
    constructor() {}

    async create(req, res) {
        try {
            const data = await reportesModel.create(req.body);
            const dataRes = {...data, body:req.body} // Usa await aquí
            res.status(201).json(data);
            console.log("DATA", dataRes)
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    }


   async update(req, res) {
    try {
        const { id } = req.params;
        const data = await reportesModel.update(id, req.body);
        res.status(200).json(data);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}


    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await reportesModel.delete(id);
            
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Registro no encontrado' });
            }

            res.status(200).json({ message: 'Registro eliminado exitosamente' });
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    }

    async getAll(req, res) {
        try {
            const data = await reportesModel.getAll();
            res.status(200).json(data);
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const data = await reportesModel.getOne(id);
            
            if (!data) {
                return res.status(404).json({ message: 'Registro no encontrado' });
            }

            res.status(200).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).send({ message: e.message });
        }
    }
}

export default new reportesController();