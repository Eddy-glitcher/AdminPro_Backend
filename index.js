const express = require('express');
require('dotenv').config(); // leyemos variables de entorno y se establecen en las variables de entorno de node.js
const cors = require('cors'); // Los coors son paquetes que permiten que mis endpoints acepten peticiones de cualquier dominio.

const { dbConnection } = require('./database/config'); // Importamos la configuración que me conecta node con mongo

// Crear el Servidor de Express
const app = express();

app.use(cors()); // Inicializamos los cors

// Base de datos
dbConnection();

// admin_mean_user
// E06LZgApOujQJZAB

// Rutas de la Aplicación
app.get('/', (req,res)=>{
    res.status(400).json({
        ok : true,
        msj : "Hola Mundo, Funciona!!"
    });
});

// Escuchamos peticiones al puerto especificado
app.listen( process.env.PORT, ()=> {
    console.log("Servidor Corriendo en puerto: "+ process.env.PORT);
})

// Podemos crear un script en scripts de nodemon en package.json que constantemente monitoree el estado de la aplicación: "start:dev" : "nodemon index.js"