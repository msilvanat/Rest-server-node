const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        //Si el usuario está activo en la DB
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });

        }


        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })


    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }
}


const googleSignin = async (req, res = response) => {

    const { id_token } = req.body;

    console.log("googleSignin token: ", id_token);

    try {
        const { correo, nombre, img } = await googleVerify(id_token);

        console.log("googleSignin Paso google verify correo es: ", correo);

        let usuario = await Usuario.findOne({ correo });

        console.log("googleSignin resultado de findone es: ", usuario);

        if (!usuario) {

            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario(data);
            
            console.log("googleSignin nuevo usuario creado: ", usuario);

            await usuario.save();
        }

        console.log("googleSignin al salir del if crear usuario usuario es: ", usuario); 

        //Si el usuario en BD
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        console.log("googleSignin nuevo token: ", token);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log("googleSignin Error: ", error);
        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }

}


module.exports = {
    login,
    googleSignin
}