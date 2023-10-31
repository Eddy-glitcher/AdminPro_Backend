const UserSchema  = require('../models/user.model');
const DoctorSchema  = require('../models/doctor.model');
const HospitalSchema  = require('../models/hospital.model');
// importamos las ayudas de tipados para las respuestas del back
const { response } = require('express');

const getAll = async(req,res = response)=>{

    const search = req.params.search;
    const regexp = new RegExp( search, 'i' );
    // Con esto hacemos que la busqueda no sea key sensitive
    
    try {
        
        // La busqueda en este caso es key sensitive por lo que hay que aplicarle una expresión regular, para que nos retorne los usuarios que coincidan con los caracteres de la busqueda.
        const [users, doctors, hospitals] = await Promise.all([
            UserSchema.find({name : regexp}),
            DoctorSchema.find({name : regexp}),
            HospitalSchema.find({name : regexp}),
        ]);

        return res.status(400).json({
            ok : true,
            msj: 'Busqueda realizada con Exito',
            users,
            doctors,
            hospitals
        });

    } catch (error) {
        return res.status(404).json({
            ok : false,
            error,
            msj : 'Ha ocurrido un error al realizar la busqueda'
        });
    }
};

const getCollection = async(req,res = response)=>{

    const table = req.params.table;
    const search = req.params.search;
    const regexp = new RegExp( search, 'i' );
    // Con esto hacemos que la busqueda no sea key sensitive, es decir que las minusculas y mayusculas valgan lo mismo

    let mapData = {
        'users'     : await UserSchema.find({name : regexp}),
        'doctors'   : await DoctorSchema.find({name : regexp}).populate('hospital', 'name image').populate('user', 'name image'),
        'hospitals' : await HospitalSchema.find({name : regexp}).populate('user', 'name image')
    }

    const resultCollection =  mapData[table];

    try {
        
        if(resultCollection.length == 0){
            return res.status(404).json({
                ok  : false,
                msj : 'La tabla debe de ser users/doctors/hospitals, verificar Logs'
            });
        }

        return res.status(200).json({
            ok : true,
            results : resultCollection
        });

    } catch (error) {
        return res.status(404).json({
            ok : false,
            error,
            msj : 'Ha ocurrido un error en la busqueda, la tabla debe de ser users/doctors/hospitals'
        });
    };
};

module.exports = { 
    getAll,
    getCollection
};