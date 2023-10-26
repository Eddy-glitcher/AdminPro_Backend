//!! Route: /api/users
const { Router } = require('express');
const { check } = require('express-validator'); // paquete en el cual tenemos el check

// Importamos el controlador de la ruta para obtener los usuarios
const {getUsers} = require('../controllers/user.controller'); 
const {createUser} = require('../controllers/user.controller'); 
const {updateUser} = require('../controllers/user.controller'); 
const {deleteUser} = require('../controllers/user.controller'); 
// Importamos el middleware para las validaciones
const { fieldValidator } = require('../middlewares/field-validator');
const { validateJwt } = require('../middlewares/validate-jwt');

const userRouter = Router();

// Para listar la lista de usuarios en la db
userRouter.get('/', validateJwt, getUsers);

// Creamos el midleware para validar la informacion que estamos recibiendo por la peticion.
userRouter.post('/', 
    [
        check('name', 'The name is Required').not().isEmpty(),
        check('email', 'The Email is Required').isEmail(),
        check('password', 'The password is Required').not().isEmpty(),
        fieldValidator // Podemos atrapar los errores capturados y enviarlos al middleware
    ],
    createUser
);

// Para actualizar un usuario
userRouter.put('/:id',
    [   
        validateJwt, // primero validamos que el jwt se reciba correctamente, sino no se ejecuta lo demás
        check('name', 'The name is Required').not().isEmpty(),
        check('email', 'The Email is Required').isEmail(),
        check('role', 'The Role is Required').isBoolean(),
        fieldValidator // Podemos atrapar los errores capturados y enviarlos al middleware
    ],
    updateUser
);

// Para eliminar un Usuario
userRouter.delete('/:id',
    validateJwt,
    deleteUser
);


module.exports = { userRouter };