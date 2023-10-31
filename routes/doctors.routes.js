//!! Route: /api/hospitals
const { Router } = require('express');
const { check } = require('express-validator'); // paquete en el cual tenemos el check

// Importamos el controlador de la ruta para obtener los usuarios
const { 
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
} = require('../controllers/doctors.controller');
const { fieldValidator } = require('../middlewares/field-validator');
const { validateJwt } = require('../middlewares/validate-jwt');

const doctorsRouter = Router();

// Para listar la lista de usuarios en la db
doctorsRouter.get('/', getDoctors);

// Creamos el midleware para validar la informacion que estamos recibiendo por la peticion.
doctorsRouter.post('/', 
    [
        validateJwt,
        check('name','The doctor name is required').not().isEmpty(),
        check('image','The doctor image is required').not().isEmpty(),
        check('hospital','The doctor hospital id needs to be valid').isMongoId(),
        // Validamos que el id, sea un id de Mongo

        fieldValidator // Podemos atrapar los errores capturados y enviarlos al middleware
    ],
    createDoctor
);

// Para actualizar un usuario
doctorsRouter.put('/:id',
    [   
        fieldValidator // Podemos atrapar los errores capturados y enviarlos al middleware
    ],
    updateDoctor
);

// Para eliminar un Usuario
doctorsRouter.delete('/:id',
    // validateJwt,
    deleteDoctor
);


module.exports = { 
    doctorsRouter
};
