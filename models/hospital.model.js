// Este modelo tiene como objetivo ponerle restricciones a mi base de datos para que cada registro de la base de datos luzca como el modelo lo indica en sus propiedades
const {Schema, model} = require('mongoose');

// Definicion del modelo db
const HospitalSchema = new Schema({
    name : {
        type : String,
        required: true
    },
    image: {
        type : String,
    },
    user : {
        type : Schema.Types.ObjectId, // Indicamos que va haber una relación con otro esquema o referencia
        ref : 'Users', // le ponemos el nombre del esquema asiganado en el modelo
        required : true
    }
}, { collection: 'hospitals' });

// Podemos renombrar propiedades del modelo desde aquí
HospitalSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject(); // Traemos la instancia del objecto UserSchema
    return object;
});


// Exportamos el esquema y lo nombramos como Users, si no le mandamos el nombre, mongo le asigna el plural automáticamente.
module.exports = model('Hospital', HospitalSchema);