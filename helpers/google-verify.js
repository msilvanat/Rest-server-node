const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENTE_ID);

const googleVerify = async (idToken = '') => {

    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENTE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    console.log("googleVerify verifyIdToken response: ", ticket);

    // const { name: nombre,
    //     picture: img,
    //     email: correo
    // } = ticket.getPayload();

    const { name: nombre,
        picture: img,
        email: correo
    } = ticket.payload;

    console.log("googleVerify destructuring result: ", nombre, img, correo);

    return { nombre, img, correo };
}

module.exports = {
    googleVerify
}
