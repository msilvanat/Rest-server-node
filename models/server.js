const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conect to db
        this.conectarDB();

        //Middlewares:funcion que se ejecuta antes de llamar a un controlador
        this.middlewares();

        //Rutas de mis aplicaciones
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use( express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }


    routes() {
       this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }

}

module.exports = Server;