const express = require('express');
require('dotenv').config(); // leyemos variables de entorno y se establecen en las variables de entorno de node.js
const cors = require('cors'); // Los coors son paquetes que permiten que mis endpoints acepten peticiones de cualquier dominio.

// Rutas para los usuarios de la aplicacion. 
const {userRouter} = require('./routes/users.routes'); 

const { dbConnection } = require('./database/config'); // Importamos la configuración que me conecta node con mongo

// Crear el Servidor de Express
const app = express();

app.use(cors()); // Inicializamos los cors

// Lectura y parseo del body. Recibimos los datos para crear el usuario
app.use(express.json());

// Base de datos
dbConnection();

// Rutas de la Aplicación
// Las rutas las enlazamos con un midleware
app.use('/api/users', userRouter );

// Escuchamos peticiones al puerto especificado
app.listen( process.env.PORT, ()=> {
    console.log("Servidor Corriendo en puerto: "+ process.env.PORT);
})

// Podemos crear un script en scripts de nodemon en package.json que constantemente monitoree el estado de la aplicación: "start:dev" : "nodemon index.js"