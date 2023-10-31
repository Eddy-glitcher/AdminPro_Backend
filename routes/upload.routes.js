//!! Route: apli/upload/table/id
const { Router } = require('express');
// Importamos el middleware para subir imagenes
const expressFileUpload = require('express-fileupload');

const {
    fileUpload,
    getPhoto
} = require('../controllers/upload.controller');

const {validateJwt} = require('../middlewares/validate-jwt');

const uploadRouter = Router();

uploadRouter.use(expressFileUpload());

uploadRouter.put('/:dbtarget/:id', validateJwt, fileUpload);
uploadRouter.get('/:dbtarget/:photo', getPhoto);

module.exports = {
    uploadRouter
};