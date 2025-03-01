# Proyecto CRUD con Node.js, Express y React
📌 Nombre: Roberto Agustin Zavaleta
📅 Fecha: 28/02/2025

Este es un proyecto que implementa un CRUD (Crear, Leer, Actualizar, Eliminar) utilizando Node.js y Express para la API REST y React para la interfaz de usuario.

## Tecnologías Utilizadas

- **Backend:**
  - Node.js
  - Express
  - MongoDB

- **Frontend:**
  - React
  - Axios (para realizar solicitudes HTTP)

Estructura del Proyecto (MVC)
Este proyecto sigue la arquitectura MVC (Modelo-Vista-Controlador) para mantener una estructura clara y organizada:

📂 Backend

models/ → Contiene los modelos de datos (MongoDB).
controllers/ → Contiene la lógica de negocio de la API.
routes/ → Define las rutas y endpoints.
app.js → Archivo principal que inicia la API con Express.

📂 Frontend
 Web-Cliente → Contiene la interfaz de usuario con React.

## Conexión a la Base de Datos
mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/?retryWrites=true&w=majority&appName=contenedores

credenciales para acceder
SERVER_DB=contenedores.mw7km.mongodb.net
USER_DB=betoazhueyapa
PASS_DB=feQ4Xvq1BYapDow8
## Endpoints de la API
Las rutas de la API están asociadas con los métodos del controlador reportesController.
(http://localhost:[puerto]/reportes/id) ||  (http://localhost:[puerto]/reportes)

route.post('/',reportesController.create);
route.get('/:id',reportesController.getOne) 
route.get('/',reportesController.getAll);  
route.put('/:id',reportesController.update); 
route.delete('/:id',reportesController.delete);








