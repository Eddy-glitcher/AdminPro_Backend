const {response} = require('express');
// Importamos el middleware de uuid
const { v4: uuidv4 } = require('uuid');
const { updateImageDb } = require('../helpers/updateimagedb');
// Usamos path para construir paths completos con node
const path = require('path');
// Comprobar que una ruta o imagen existe en un directorio del sistema+
const fs = require('fs');


const fileUpload = (req, res = response) =>{

    // Se debe de validar que la imagen que se reciba sea del tipo definido en el esquema del usuario, medico o hospital
    const dbTarget = req.params.dbtarget;
    const id      = req.params.id;

    try {
        // Validamos los tipos
        const validDbTarget = ['users', 'doctors', 'hospitals'];

        if(!validDbTarget.includes(dbTarget)){
            return response.status(400).json({
                ok: false,
                msj: 'No es un medico, usuario u hospital'
            });
        };
        
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok  : false,
                msj : 'Ningún archivo ha sido cargado!',
            });
        };

        // Procesamos la imagen
        const fileImage = req.files.image; // Tenemos acceso a files gracias al middleware inicializado en las rutas

        // Extraemos la extension del archivo
        const imageName = fileImage.name.split('.');
        const imageExtension = imageName[imageName.length -1].toLowerCase();

        // Validamos la extensiones validas
        const validExtensions = ['png', 'jpg', 'jpeg', 'avif'];

        if(!validExtensions.includes(imageExtension)){
            return res.status(400).json({
                ok: false,
                msj: 'Extension de imagen no válida, solo: png, jpg, jpeg, avif'
            });
        };

        // Generar el nombre de la imagen o archivo
        // No podemos tener imagenes con nombre igual porque si varios usuarios cargan la misma imagen, una sobreescribe la otra

        // Genearmos el identificador de imagen único
        const fileName = `${uuidv4()}.${imageExtension}`; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed.jpg'

        // Generamos el path para guardar las imagenes en el upload correspondiente
        const uploadPath = `./uploads/${dbTarget}/${fileName}`;

        // Movemos la image al directorio en uploads
        fileImage.mv(uploadPath, (err)=> {
            if (err){   
                return res.status(500).json({
                    ok : false,
                    msj : 'La imagen no ha podido ser guardada!',
                    uploadPath,
                });
            };

            // Es aconsejable que los archivos los subamos a un servicio de tercero y no directamente a la db, puesto que se podría subir algún archivo malicioso.

            // Actualizamos la db
            updateImageDb(dbTarget, id, fileName);

            return res.status(200).json({
                ok : true,
                msj : 'Imagen cargada correctamente!',
                id,
                dbTarget,
                fileName
            });
        });

    } catch (error) {
        return res.status(400).json({
            ok : false,
            msj : 'Ha ocurrido un problema al realizar la peticion al servidor',
        });
    }
};

const getPhoto = (req , res = response) => {

    const dbTarget = req.params.dbtarget;
    const photo = req.params.photo;

    const pathImage = path.join(__dirname, `../uploads/${dbTarget}/${photo}`);


    // Comprobamos si el path existe para eso importamos filesystem
    if(fs.existsSync(pathImage)){
        // Para decirle a express que responda con una imagen le pasamos lo siguiente
        res.sendFile(pathImage);
    }else{
        // Si la imagen no existe en el filesystem retornamos una imagen por defecto
        const pathImage = path.join(__dirname, `../uploads/image-not-found/no-img.jpg`);
        res.sendFile(pathImage);
    };

};

module.exports = {
    fileUpload,
    getPhoto
};