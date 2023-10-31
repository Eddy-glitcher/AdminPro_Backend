//!! Route: /todo/search
const { Router } = require('express');

// Importamos el controlador de la ruta para obtener los usuarios
const { 
    getAll, 
    getCollection,
} = require('../controllers/search.controller');
const { validateJwt } = require('../middlewares/validate-jwt');

const searchRouter = Router();

// Para listar la lista de usuarios en la db
searchRouter.get('/:search', validateJwt, getAll);
searchRouter.get('/collection/:table/:search', validateJwt, getCollection);

module.exports = { 
    searchRouter
};
