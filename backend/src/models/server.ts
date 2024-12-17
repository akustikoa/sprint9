import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as path from 'path';

import tourRoutes from '../routes/tour';
import diaRoutes from '../routes/dia';
import uploadRoutes from '../routes/upload'; // Importa la ruta d'upload
import './index'; // Inicialitza relacions i models
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

    middlewares() {

        this.app.use(express.json());
        // Configuració CORS (per a proves)
        this.app.use(cors());
        // Middleware per servir arxius estàtics des de /public/assets
        const assetsPath = path.join(process.cwd(), 'public', 'assets');
        console.log(`Ruta absoluta a assets: ${assetsPath}`); // Log de la ruta absoluta corregida

        this.app.use('/assets', (req, res, next) => {
            // console.log(`Sol·licitud a /assets: ${req.url}`);
            next();
        }, express.static(assetsPath));
    }

    routes() {
        this.app.use('/api/tours', tourRoutes);
        this.app.use('/api/days', diaRoutes);
        this.app.use('/api', uploadRoutes); // Afegim la nova ruta d'upload
    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log('BD connectada');
            await db.sync();
            console.log('Models sincronitzats correctament');
        } catch (error) {
            console.error('Error en la connexió de la BD o sincronització:', error);
        }
    }
}

export default Server;





//CODI PER XARXA LOCAL (MOVIL-CLIENT)
// import express, { Application } from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import tourRoutes from '../routes/tour';
// import diaRoutes from '../routes/dia';
// import './index'; // Això inicialitza les relacions i models
// import db from '../db/connection';

// dotenv.config();

// class Server {
//     private app: Application;
//     private port: number; // Canviat a number
//     private host: string; // Nova variable per l'host

//     constructor() {
//         this.app = express();
//         this.port = parseInt(process.env.PORT || '3001', 10); // Convertir a number
//         this.host = '0.0.0.0'; // Escoltar a totes les adreces IP
//         this.listen();
//         this.middlewares();
//         this.routes();
//         this.dbConnect();
//     }

//     listen() {
//         this.app.listen(this.port, this.host, () => {
//             console.log(`Servidor corrent en http://${this.host}:${this.port}`);
//         });
//     }

//     routes() {
//         this.app.use('/api/tours', tourRoutes);
//         this.app.use('/api/days', diaRoutes);
//     }

//     middlewares() {
//         this.app.use(express.json());
//         this.app.use(cors());
//     }

//     async dbConnect() {
//         try {
//             await db.authenticate();
//             console.log('BD connectada');

//             // Sincronitzar models (només per a desenvolupament; elimina `alter: true` a producció)
//             await db.sync();
//             console.log('Models sincronitzats correctament');
//         } catch (error) {
//             console.error('Error en la connexió de la BD o sincronització:', error);
//         }
//     }
// }

// export default Server;