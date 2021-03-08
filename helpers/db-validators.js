
const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`)

    }
}

const emailExists = async( correo = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
       throw new Error(`El correo: ${ correo } ya está registrado`);

    }
}

const existeUsuarioPorId = async( id ) => {
    //Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
       throw new Error(`El id no existe ${ id } `);

    }
}

// Validadores de categorías
const existeCategoriaPorId = async( id ) => {
    //Verificar si existe la categoría
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
       throw new Error(`El id no existe ${ id } `);

    }
}

//Productos
const existeProductoPorId = async( id ) => {
    //Verificar si existe el producto
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
       throw new Error(`El id no existe ${ id } `);

    }
}



module.exports = {
    esRoleValido,
    emailExists,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}