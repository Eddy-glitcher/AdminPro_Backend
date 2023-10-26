// Con este middleware validamos que los campos requeridos que recibimos en la ruta POST /api/users, se reciban correctamente 
// Los middleware son como cualquier otro controlador, con la diferencia de que utilizan el método next.
const { response } = require('express');
const jwt  = require('jsonwebtoken');

const validateJwt = (req, res = response, next)=>{

    // 1- Leer el Token
    const token = req.header('x-token'); 

    // Verificar que el token exista
    if(!token){
        return res.status(401).json({
            ok: false,
            msj : 'Token no encontrado, Revise headers!!'
        });
    };

    try {
        // Verificamos que el token haga match con la firma que tiene el token
        const  {uid} = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.uid = uid; // establecemos la propiedad uid en la request, para saber que usuario realizó la peticion al servidor
        next(); // si todo sale bien se llama esta funcion

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msj : 'Token no válido'
        });
    }
}

module.exports = {
    validateJwt
}