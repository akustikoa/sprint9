import express, { Application, Request, Response } from 'express';       // a la 33 ROUTES DE DIA I RECORREGUT COMENTAT
import cors from 'cors';
import dotenv from 'dotenv';
import tourRoutes from '../routes/tour';
import diaRoutes from '../routes/dia';
import recorregutRoutes from '../routes/recorregut';
import db from '../db/connection';

dotenv.config();

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corrent en el port ${this.port}`);
        });
    }

    routes() {
        this.app.use('/api/tours', tourRoutes);
        this.app.use('/api/dies', diaRoutes);
        this.app.use('/api/recorreguts', recorregutRoutes);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log('BD connectada');
        } catch (error) {
            console.log(error);
            console.error('Error en la connexió de la BD:', error);
        }
    }
}

export default Server;
