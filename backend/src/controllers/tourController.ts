import { Request, Response } from 'express';
import Tour from '../models/tour';

export const validateTourPassword = async (req: Request, res: Response) => {
    const { id_tour, password } = req.body;

    try {
        const tour = await Tour.findByPk(id_tour);
        if (tour && (tour as any).password === password) {  // !!!!Cas explícit per a password
            res.json({ valid: true });
        } else if (!tour) {
            res.status(404).json({ msg: 'Tour no trobat' });
        } else {
            res.status(403).json({ msg: 'Contrasenya incorrecta' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};

export const getTours = async (req: Request, res: Response) => {
    const tours = await Tour.findAll();
    res.json(tours);
};

export const getTour = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tour = await Tour.findByPk(id);

    if (tour) {
        res.json(tour);
    } else {
        res.status(404).json({ msg: `No existeix un tour amb id ${id}` });
    }
};

export const createTour = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const tour = await Tour.create(body);
        res.json(tour);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear el tour' });
    }
};

export const updateTour = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    const tour = await Tour.findByPk(id);
    if (tour) {
        await tour.update(body);
        res.json({ msg: `S'ha actualitzat el tour amb id ${id}` });
    } else {
        res.status(400).json({ msg: `No s'ha pogut actualitar el tour amb id ${id}` });
    }
};


export const deleteTour = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tour = await Tour.findByPk(id);

    if (!tour) {
        res.status(404).json({ msg: `No existeix un tour amb id ${id}` });
    } else {
        await tour.destroy();
        res.json({ msg: 'Tour eliminat' });
    }
};







// import { Request, Response } from 'express';
// import Tour from '../models/tour';

// export const verifyTourPassword = async (req: Request, res: Response) => {
//     const {id_tour, password} = req.body;
// }

// export const getTours = async (req: Request, res: Response) => {
//     const tours = await Tour.findAll();
//     res.json(tours);
// };

// export const getTour = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const tour = await Tour.findByPk(id);

//     if (tour) {
//         res.json(tour);
//     } else {
//         res.status(404).json({ msg: `No existeix un tour amb id ${id}` });
//     }
// };

// export const createTour = async (req: Request, res: Response) => {
//     const { body } = req;
//     try {
//         const tour = await Tour.create(body);
//         res.json(tour);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: 'Error al crear el tour' });
//     }
// };

// export const updateTour = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { body } = req;
//     const tour = await Tour.findByPk(id);
//     if (tour) {
//         await tour.update(body);
//         res.json({ msg: `S'ha actualitzat el tour amb id ${id}` });
//     } else {
//         res.status(400).json({ msg: `No s'ha pogut actualitar el tour amb id ${id}` });
//     }
// };


// export const deleteTour = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const tour = await Tour.findByPk(id);

//     if (!tour) {
//         res.status(404).json({ msg: `No existeix un tour amb id ${id}` });
//     } else {
//         await tour.destroy();
//         res.json({ msg: 'Tour eliminat' });
//     }
// };
