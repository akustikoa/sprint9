import { Router, Request, Response, NextFunction } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const router = Router();

// Configuració de Multer
const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../public/assets');
        console.log('Configurant destí:', uploadPath); // Mostra la carpeta de destí
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        console.log('Configurant nom del fitxer:', uniqueName); // Mostra el nom únic del fitxer
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

router.post('/upload', (req: Request, res: Response, next: NextFunction) => {
    upload.single('file')(req, res, (err: any) => {
        if (err) {
            console.error('Error a Multer:', err.message || err); // Mostra l'error exacte
            return res.status(500).json({ error: 'Error en pujar el fitxer', details: err.message || err });
        }

        if (!req.file) {
            console.log('No s\'ha rebut cap fitxer');
            return res.status(400).json({ error: 'No s\'ha seleccionat cap fitxer' });
        }

        const fileUrl = `/assets/${req.file.filename}`;
        console.log('Fitxer rebut correctament:', fileUrl); // Mostra la URL de la imatge

        res.status(200).json({
            message: 'Imatge pujada correctament!',
            url: fileUrl,
        });
    });
});

export default router;


