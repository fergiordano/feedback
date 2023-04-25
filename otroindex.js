

//En este archivo utilizamos la modularización de archivos
//librerías
const express = require('express');
require('dotenv').config();
require('../reactvite/feedback/conexion/conecction')
const PORT = process.env.PORT || 8080;
const userRoutes = require('../reactvite/feedback/routes/userRoutes')
const app = express();

//middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use('/', userRoutes);

//escucha de la app
app.listen(PORT, () => {
    console.log(`Servidor modularizado corriendo en el Puerto ${PORT}`);
});