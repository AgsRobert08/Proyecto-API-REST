import express from 'express';
//variable encargada para gestionar las rutas
const route=express.Router();
import reportesController from '../controllers/reportes.js';

/**Definicion de rutas y metodos HTTP */
route.post('/',reportesController.create);
route.get('/:id',reportesController.getOne)
route.get('/',reportesController.getAll);
route.put('/:id',reportesController.update);
route.delete('/:id',reportesController.delete);


export default route;