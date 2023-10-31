const HospitalSchema  = require('../models/hospital.model');
// importamos las ayudas de tipados para las respuestas del back
const { response } = require('express');
// Importamos el metodo para encriptar contraseñas con bcrypt
const bcrypt = require('bcryptjs');
const {generateJwt} = require('../helpers/jwt.helper');

const getHospitals = async(req,res = response)=>{

    // Si queremos que nos devuelva todos los hospitales, sin ningun filtro lo llamamos así
    // Si queremos saber quien creó cada hospital hacemos lo siguiente
    const hospitals = await HospitalSchema.find().populate('user', 'name');

    try {
        return res.status(400).json({
            ok : true,
            msj: 'Todo Funciona Bien',
            hospitals,
            uid : req.uid
        });
    } catch (error) {
        return res.status(404).json({
            ok : false,
            msj : 'Error al tratar de listar los hospitales',
            error,
        });
    }
}

const createHospital = async(req,res = response)=>{

    const {name, image} = req.body;
    // Cuando validamos el token el uid siempre lo recibimos del token
    const uid = req.uid;
    
    try {
        // Comprobamos que no exista un hospital con ese nombre.
        const hospitalExists = await HospitalSchema.findOne({name});

        if(hospitalExists){
            return res.status(401).json({
                ok: false,
                msj : 'Este hospital ya existe en la db',
                name
            });
        };

        const hospital = await new HospitalSchema({ user : uid, ...req.body });

        const newHospital = await hospital.save();
        
        return res.status(400).json({
            ok : true,
            msj: 'El hospital se ha guardado correctamente en la db',
            newHospital
        });
    } catch (error) {
        return res.status(500).json({
            ok : false,
            msj : 'Ha ocurrido un error al guardar el nuevo hospital',
            error
        });
    }

}

const updateHospital = async(req,res = response)=>{

    try {
        return res.status(400).json({
            ok : true,
            msj: 'Todo bien'
        });
    } catch (error) {
        return res.status(404).json({
            ok : false,
            error,
            msj : 'Todo mal'
        });
    }

}

const deleteHospital = async(req, res = response)=>{
// Actualmente es recomendable mantener los usuarios en incativo en lugar de eliminarlos de la db, para tenerlos almenos referenciados. 

    try {
        return res.status(400).json({
            ok : true,
            msj: 'Todo bien'
        });
    } catch (error) {
        return res.status(404).json({
            ok : false,
            error,
            msj : 'Todo mal'
        });
    }
}

module.exports = { 
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}