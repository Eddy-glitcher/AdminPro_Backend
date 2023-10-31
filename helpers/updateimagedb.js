// Importamos los modelos para las consulta en la db
const UserSchema = require('../models/user.model');
const DoctorSchema = require('../models/doctor.model');
const HospitalSchema = require('../models/hospital.model');

// Importamos el file system para trabajar con los archivos y carpetas del sistema
const fs = require('fs');

const deleteImageDb = (path)=>{
    // Comrpobamos que la imagen existe
    if(fs.existsSync(path)){
        // Borramos la imagen anterior en caso de que ya existiese
        fs.unlinkSync(path);
    };
};

const updateImageDb = async(dbTarget, id, fileName)=>{

    let oldPath = '';
    let userOldPath = ''

    try {
        switch (dbTarget) {
            case 'users':
                const user = await UserSchema.findById(id);
                
                if(!user){
                    console.log("No es un id de Usuario Correcto!!");
                    return false;
                };

                userOldPath = `./uploads/users/${user.image}`;
                deleteImageDb(userOldPath);

                user.image = fileName;
                await user.save();
    
                return true;
                break;
            case 'doctors':
                const doctor = await DoctorSchema.findById(id);
                
                if(!doctor){
                    console.log("No es un Doctor!!");
                    return false;
                };
    
                oldPath = `./uploads/doctors/${doctor.image}`;
                deleteImageDb(oldPath);

                doctor.image = fileName;
                await doctor.save();
    
                return true;
                break;
                case 'hospitals':
                    const hospital = await HospitalSchema.findById(id);
                    
                    if(!hospital){
                        console.log("No es un id de Usuario Correcto!!");
                        return false;
                    };
        
                    const oldPath = `./uploads/hospitals/${hospital.image}`;
                    deleteImageDb(oldPath);
    
                    hospital.image = fileName;
                    await hospital.save();
        
                    return true;
                    break;
            default:
                return false;
        }
    } catch (error) {
        return false;
    }

};

module.exports = {
    updateImageDb
}
