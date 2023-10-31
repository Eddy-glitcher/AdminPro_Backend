const DoctorSchema  = require('../models/doctor.model');
// importamos las ayudas de tipados para las respuestas del back
const { response } = require('express');
// Importamos el metodo para encriptar contraseñas con bcrypt
const bcrypt = require('bcryptjs');

const getDoctors = async(req,res = response)=>{
    try {
        // Con esto consultamos todos los medicos y filtramos por el usuario que lo ha creado y el hospital al que pertenece el medico
        const doctors = await DoctorSchema.find().populate('user', 'name email')
                                                .populate('hospital', 'name image');
        
        return res.status(400).json({
            ok : true,
            msj: 'Doctores consultados con Exito',
            doctors
        });
    } catch (error) {
        return res.status(404).json({
            ok : false,
            error,
            msj : 'Ha ocurrido un error al consultar los Medicos'
        });
    }
}

const createDoctor = async(req,res = response)=>{

    const uid = req.uid;
    
    try {

        //TODO: Comrpobamos que el médico no exista en la db

        const doctor = await new DoctorSchema({ user : uid, ...req.body});
        const newDoctor = await doctor.save();

        return res.status(400).json({
            ok : true,
            msj: 'Doctor guardado Correctamente',
            newDoctor
        });
    } catch (error) {
        return res.status(500).json({
            ok : false,
            error,
            msj : 'Todo mal'
        });
    }
}

const updateDoctor = async(req,res = response)=>{

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

const deleteDoctor = async(req, res = response)=>{
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
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}