import { Request, Response } from 'express';
import User from '../models/user';
import Tour from '../models/tour';

export const verifyUserTourPassword = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // 1. Verificar si l'usuari existeix
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ msg: 'Usuari no trobat' });
            return;
        }

        // 2. Verificar si l'usuari està associat amb un tour
        const tour = await Tour.findByPk(user.getDataValue('id_tour'));
        if (!tour) {
            res.status(404).json({ msg: 'Tour no trobat per aquest usuari' });
            return;
        }

        // 3. Verificar si la contrasenya és correcta
        if (tour.getDataValue('password') === password) {
            res.json({ valid: true, id_tour: tour.getDataValue('id_tour') });
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