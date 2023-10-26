//!! Route: /api/login
const { Router } = require('express');
// Importamenos el controlador para las rutas auth
const { check } = require('express-validator'); // paquete en el cual tenemos el check
const { login } = require('../controllers/auth.controller');
const { fieldValidator } = require('../middlewares/field-validator');

const authRouter = Router();

authRouter.post('/', 
    [
        check('email', 'The email is required').isEmail(), 
        check('password', 'The password is required').not().isEmpty(),
        fieldValidator // Podemos atrapar los errores capturados y enviarlos al middleware
    ],
    login
);

module.exports = { authRouter }