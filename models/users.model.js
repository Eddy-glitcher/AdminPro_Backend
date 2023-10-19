// Este modelo tiene como objetivo ponerle restricciones a mi base de datos para que cada registro de la base de datos luzca como yo quiero

const {Schema, model} = require('mongoose')

// Definicion del modelo db
const UserSchema = Schema({
    name : {
        type : String,
        required: true
    },
    email :{
        type : String,
        required: true,
        unique : true
    },
    password: {
        type : String,
        required: true
    },
    image: {
        type : String,
    },
    role : {
        type : String,
        required: true,
        default : 'USER_ROLE'
    },
    google: {
        type : Boolean,
        default : false
    }
});

// Exportamos el esquema y lo nombramos como Users, si no le mandamos el nombre, mongo le asigna el plural automáticamente.
module.exports.model('Users', UserSchema);