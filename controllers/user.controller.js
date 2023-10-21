const UserSchema  = require('../models/users.model');
// importamos las ayudas de tipados para las respuestas del back
const { response } = require('express');
// Importamos el metodo para encriptar contraseñas de bcrypt
const bcrypt = require('bcryptjs');


const getUsers = async(req,res)=>{
    try {
        const users = await UserSchema.find({}, 'name email role google');

        res.status(400).json({
            ok : true,
            users
        });
    } catch (error) {
        res.status(404).json({
            ok : false,
            error
        });
    }
}

const createUser = async(req,res = response)=>{

    // Obtenemos los datos de la petición
    const { email, password} = req.body;

    try {

    const emailExists = await UserSchema.findOne({email}); // Comprobamos que el email que se recibe exista en la base de datos, proceso asincrono. Consulta a db
    
    // Si el email ya existe en la db el proceso muere en el siguiente if.
    if (emailExists) {
        return res.status(400).json({
            ok: false,
            msj : 'El email ya existe'
        })
    }

    const user = await new UserSchema(req.body); // Creamos la instancia de la clase, según el modelo User

    // Encriptamos la contraseña
    const salt = bcrypt.genSaltSync(); // Generamos conjunto de caracteres unicos aleatorios, con un proceso aleatorio.
    user.password = bcrypt.hashSync(password, salt); // Con esto ya encriptamos la contraseña

    await user.save(); // save retorna una promesa, con await esperamos que se resuelva antes de continuar

    res.status(400).json({
        ok : true,
        msj: 'Usuario Creado con Exito',
        user
    });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok : false,
            msj : 'Error inesperado... revisar Logs'
        });
    }
}

module.exports = { getUsers, createUser }