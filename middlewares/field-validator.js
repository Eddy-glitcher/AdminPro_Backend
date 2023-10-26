// Con este middleware validamos que los campos requeridos que recibimos en la ruta POST /api/users, se reciban correctamente 
// Los middleware son como cualquier otro controlador, con la diferencia de que utilizan el método next.

const { response } = require('express');
// Importamos el express validator
const { validationResult }  = require('express-validator');


const fieldValidator = (req , res= response , next)=>{ // si el middleware pasa ejecutamos el next
    const errors = validationResult(req); // Crea un arreglo de errores capturados por el midleware
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors : errors.mapped() // mapemaos los errores
        })
    }

    // Llegados a este punto no hay errores.
    next();

}

module.exports = {
    fieldValidator
}