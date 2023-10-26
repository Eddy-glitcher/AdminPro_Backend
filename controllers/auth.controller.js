const {response} = require('express');
const UserSchema = require('../models/users.model');
// Importamos el metodo para encriptar contraseñas con bcrypt
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt.helper');


const login = async(req, res = response)=>{

    const {email, password} = req.body;

    try {
        
        const dbUser = await UserSchema.findOne({email});

        // Verificamos Email
        if(!dbUser){
            return res.status(404).json({
                ok: false,
                msj: "Email o Contraseña no Válidos!",
                // Es bueno no retornar un mensaje tipo 'el email no es válido' ya que esto da pistas y puede que nuestro sitio sea bombardeado por hackers.
            });
        }

        // Verificamos contraseña
        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msj: "Email o Contraseña no Válidos!",
                // Es bueno no retornar un mensaje tipo 'el email no es válido' ya que esto da pistas y puede que nuestro sitio sea bombardeado por hackers.
            });
        }


        // Generamos Token - JWT
        // Basicamente es utilizado de formma pasiva el usuario en nuestra app. Se compone de un header, halo y la firma. Se puede grabar lo que sea encriptado y desencriptar, hay que tener cuidado de no almacenar info sensible

        const token = await generateJwt(dbUser.id); // Esperamos que genere el Token antes de lanzar el mensaje.

        return res.status(200).json({
            ok: true,
            msj: "¡Usuario Logeado Correctamente!",
            token
        });

    } catch (error) {
        console.log(error);

        return res.status(400).json({
            ok: false,
            msj: "Error al Loggerar, revisar Logs"
        });
    }
};

module.exports = {
    login
}