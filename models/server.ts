import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { authRouter, userRouter } from '../routes';
import { config } from '../config';
import { RoutesType } from '../types';
import { dbConnection } from '../database';

class Server {

    private app: Application;
    private port: string;
    private baseUrl: string;
    private apiPaths: RoutesType;

    constructor() {
        this.app = express();
        this.port = config.port || '7997';
        this.baseUrl = config.base_url || '/api/v1';
        this.apiPaths = {
            auth: `${ this.baseUrl }/auth`,
            users: `${ this.baseUrl }/users`,
        }

        //* Conexión con la base de datos
        this.connectDB();
        
        //* Middlewares: 
        this.middlewares();

        //* Definiendo rutas
        this.routes();

    }

    middlewares() {
        //* Morgan
        this.app.use( morgan( 'dev' ) );

        //* Cors
        this.app.use( cors() );

        //* Lectura de body
        this.app.use( express.json() );

        //* Carpeta pública
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.apiPaths.users, userRouter );
        this.app.use( this.apiPaths.auth, authRouter );
    }

    async connectDB(){
        await dbConnection();
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto: ${ this.port }`);
        });
    }

}

export default Server;