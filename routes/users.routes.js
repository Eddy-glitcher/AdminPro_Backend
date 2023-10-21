//!! Route: /api/users
const { Router } = require('express');
const { check } = require('express-validator'); // paquete en el cual tenemos el check

// Importamos el controlador de la ruta para obtener los usuarios
const {getUsers} = require('../controllers/user.controller'); 
const {createUser} = require('../controllers/user.controller'); 
// Importamos el middleware para las validaciones
const { fieldValidator } = require('../middlewares/field-validator');

const userRouter = Router();

userRouter.get('/', getUsers);

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

module.exports = { userRouter };