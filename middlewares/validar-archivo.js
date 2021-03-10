


const validarArchivoSubir = ( req, res = response, next ) => {



    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) { //Pregunta si en la req viene la propiedad file
        return res.status(400).json({
             msg: 'No hay archivos que subir - validarArchivoSubir' });
        
    }

    next();


}


module.exports = {
    validarArchivoSubir
}