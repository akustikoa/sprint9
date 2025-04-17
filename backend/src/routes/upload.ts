import { Router, Request, Response, NextFunction } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Configuració dinàmica de Multer
const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        const idTour = req.query.id_tour as string || 'unknown';
        const folderPath = path.join(__dirname, '../../public/assets', idTour);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`📁 Carpeta creada per al tour: assets/${idTour}`);
        }

        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

router.post('/upload', (req: Request, res: Response, next: NextFunction) => {
    upload.single('file')(req, res, (err: any) => {
        if (err) {
            console.error('❌ Error a Multer:', err.message || err);
            return res.status(500).json({ error: 'Error en pujar el fitxer', details: err.message || err });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No s\'ha rebut cap fitxer' });
        }

        if (!req.query.id_tour) {
            return res.status(400).json({ error: 'Falta id_tour a la query' });
        }

        const idTour = req.query.id_tour.toString();
        const fileUrl = `/assets/${idTour}/${req.file.filename}`;
        console.log('✅ Fitxer pujat correctament:', fileUrl);

        res.status(200).json({
            message: 'Imatge pujada correctament!',
            url: fileUrl,
        });
    });
});

export default router;

