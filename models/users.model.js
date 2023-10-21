// Este modelo tiene como objetivo ponerle restricciones a mi base de datos para que cada registro de la base de datos luzca como yo quiero
const {Schema, model} = require('mongoose');

// Definicion del modelo db
const UserSchema = new Schema({
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

// Podemos renombrar propiedades del modelo desde aquí
UserSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject(); // Traemos la instancia del objecto UserSchema

    object.uid = _id; // Con esto cambiamos el identificados de los ids para los usuarios, pero solo es visual, no afecta la base de datos.
    return object;
});


// Exportamos el esquema y lo nombramos como Users, si no le mandamos el nombre, mongo le asigna el plural automáticamente.
module.exports = model('Users', UserSchema);