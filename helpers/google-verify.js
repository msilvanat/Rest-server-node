const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async (idToken = '') => {


    const ticket = await client.verifyIdToken({
        idToken,
        audience: '1047007954088-r298u67djm191e6vosaoq9taqsvepqp7.apps.googleusercontent.com',//process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });


    
    //console.log(ticket);

    const { name: nombre,
            picture: img,
            email: correo 
         } = ticket.getPayload();

    return { nombre, img, correo };

}


module.exports = {
    googleVerify
}
