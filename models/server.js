const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { createServer } = require('http');

const { dbConecction } = require('../database/config');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server)

        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            users: '/api/user',
            uploads: '/api/uploads'
        }

        //DB Connection
        this.databaseConnection();
        //Middleware
        this.midleware();
        //Routes
        this.routes();
        //Sockets
        this.sockets();
    }
    async databaseConnection() {
        await dbConecction();
    }
    midleware() {
        //CORS
        this.app.use(cors());
        //Lectura y Parseo de datos
        this.app.use(express.json());
        //Static files
        this.app.use(express.static('public'));
        //Upload files
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.users, require('../routes/user'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }
    sockets() {
        this.io.on("connection", socketController)
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;