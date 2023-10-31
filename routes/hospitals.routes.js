//!! Route: /api/hospitals
const { Router } = require('express');
const { check } = require('express-validator'); // paquete en el cual tenemos el check

// Importamos el controlador de la ruta para obtener los usuarios
const { 
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
} = require('../controllers/hospitals.controller');
const { fieldValidator } = require('../middlewares/field-validator');
const { validateJwt } = require('../middlewares/validate-jwt');

const hospitalsRouter = Router();

// Para listar la lista de usuarios en la db
hospitalsRouter.get('/', validateJwt, getHospitals);

// Creamos el midleware para validar la informacion que estamos recibiendo por la peticion.
hospitalsRouter.post('/', 
    [
        validateJwt,
        check('name', 'The hospital name is required').not().isEmpty(),
        check('image', 'The hospital image is required').not().isEmpty(),
        fieldValidator // Podemos atrapar los errores capturados y enviarlos al middleware
    ],
    createHospital
);

// Para actualizar un usuario
hospitalsRouter.put('/:id',
    [   
        fieldValidator // Podemos atrapar los errores capturados y enviarlos al middleware
    ],
    updateHospital
);

// Para eliminar un Usuario
hospitalsRouter.delete('/:id',
    // validateJwt,
    deleteHospital
);


module.exports = { 
    hospitalsRouter
};
