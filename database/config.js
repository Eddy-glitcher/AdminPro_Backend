// Configuración de Mongoose
const mongoose = require('mongoose');

const dbConnection = async()=>{ // Retorna una Promesa gracias al async
    try {

    await mongoose.connect(process.env.DB_CNN);
        console.log("Db Online!! :)");
    } catch (error) {
        console.log("There is a problem whit the database connection!", error);
    }
}

module.exports = {
    dbConnection
}