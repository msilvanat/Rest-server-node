const { response } = require('express');
const { Producto } = require('../models');
const producto = require('../models/producto');

// obtenerProductos - paginado - total - populate
const obtenerProductos = async (req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .skip(Number( desde))
        .limit(Number( limite))
    ]);

    res.json({
        total,
        productos
    });

} 

//obtenerCategoria - populate {}
const obtenerProducto = async( req, res = response ) => {

    const { id } = req.params;
    const producto = await Producto.findById( id )
              .populate('usuario', 'nombre')
              .populate('categoria', 'nombre');

    res.json( producto );
}

// Crear Producto
const crearProducto = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre }); //existe una categoria con ese nombre?

    if ( productoDB) {  //si ya existe marco un error
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id //el usuario debe ser un id de Mongo
    }

    const producto = new Producto( data ); //se crea la nueva categoría

    //Guardar DB
    await producto.save();

    res.status(201).json(producto);

}

// actualizarProducto
const actualizarProducto = async( req, res = response ) => {
 const { id } = req.params;
const { estado, usuario, ...data } = req.body;
if ( data.nombre ) {

    data.nombre = data.nombre.toUpperCase(); // data de la nueva categoría
}

data.usuario = req.usuario._id;

const producto = await Producto.findByIdAndUpdate(id, data, { new: true});

res.json( producto );

}

//borrarProducto(byId) - estado:false

const borrarProducto= async( req, res = response ) => {
const { id } = req.params;
const productoBorrado = await Producto.findByIdAndUpdate( id, { estado: false }, {new: true});

res.json( productoBorrado);
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}