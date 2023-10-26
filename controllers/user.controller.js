const UserSchema  = require('../models/users.model');
// importamos las ayudas de tipados para las respuestas del back
const { response } = require('express');
// Importamos el metodo para encriptar contraseñas con bcrypt
const bcrypt = require('bcryptjs');
const {generateJwt} = require('../helpers/jwt.helper');

const getUsers = async(req,res = response)=>{
    try {
        const users = await UserSchema.find({}, 'name email role google');

        res.status(400).json({
            ok : true,
            users,
            uid : req.uid
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

    const userToken = await generateJwt(user.id); // Esperamos que genere el Token antes de lanzar el mensaje.

    res.status(400).json({
        ok : true,
        msj: 'Usuario Creado con Exito',
        user,
        userToken

    });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok : false,
            msj : 'Error inesperado... revisar Logs'
        });
    }
}

const updateUser = async(req, res = response)=>{
    // TODO: Validar token y comprobar que es el usuario correcto

    const uid = req.params.id;

    try {

        // Compruebo que exista el usuario con el id en la db
        const dbUser = await UserSchema.findById(uid);
    
        if(!dbUser){
            res.status(404).json({
                ok : false,
                msj : 'Usuario no Existe'
            });
        }

        // Verificamos si el email es igual al de la base de datos
        const {email, password, google, ...userData} = req.body;
        
        if(dbUser.email !== email){
            // Verificamos que no exista un usuario con ese email.
            const emailExists = await UserSchema.findOne({email});
            if(emailExists){
                return res.status(400).json({
                    ok : false,
                    msj : 'Usuario Existe con ese Email'
                });
            }
        }

        userData.email = email;

        // Actualizamos el Usuario

        const updatedUser = await UserSchema.findByIdAndUpdate(uid, userData, {new: true});
        // Actualizamos el usuario con el id correspondiente y retornamos usuario actualizado.

        res.status(200).json({
            ok : true,
            msj : 'Usuario Actualizado',
            user: updatedUser
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msj: 'Error Inesperado en la Actualizacion, Intentalo Otra vez'
        })
    }

}


const deleteUser = async(req, res = response)=>{
// Actualmente es recomendable mantener los usuarios en incativo en lugar de eliminarlos de la db, para tenerlos almenos referenciados. 

    const userId = req.params.id;

    try {
        const dbUserExists = await UserSchema.findById(userId);
        
        if(!dbUserExists){
            return res.status(404).json({
                ok : false,
                msj : 'Usuario no existe'
            });
        };

        const dbUser = await UserSchema.findByIdAndDelete(userId);

        return res.status(200).json({
            ok : true,
            msj : 'Usuario Eliminado correctamente',
            user : dbUser
        });


    } catch (error) {
        return res.status(400).json({
            ok : false,
            msj : 'Error al eliminar Usuario',
            user : userId
        })
    }

}

module.exports = { getUsers, createUser, updateUser, deleteUser }