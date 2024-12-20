import { Request, Response } from 'express';
import { Tour, User } from '../models';
import Dia from '../models/dia';



//LOGIN
export const verifyUserTourPassword = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Existeix usuasi?
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ msg: 'Usuari no trobat' });
            return;
        }

        // usuari associat en un tour?
        const tour = await Tour.findByPk(user.getDataValue('id_tour'));
        if (!tour) {
            res.status(404).json({ msg: 'Tour no trobat per aquest usuari' });
            return;
        }

        // Contrasenya correcta?
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


//TOURS COMPLETS
//CREAR 
export const createFullTour = async (req: Request, res: Response): Promise<void> => {
    const { tour, days, users } = req.body;

    try {
        if (!tour || !tour.nom_tour || !tour.imatge_tour || !tour.data_inici || !tour.data_final || !tour.password) {
            res.status(400).json({ msg: 'Falten camps obligatoris al tour.' });
            return;
        }

        // Crea el tour
        const createdTour = await Tour.create(tour);

        // Crea els dies associats
        if (days && days.length > 0) {
            for (const day of days) {
                await Dia.create({ ...day, id_tour: createdTour.getDataValue('id_tour') });
            }
        }

        // Crea usuaris associats
        if (users && users.length > 0) {
            for (const user of users) {
                await User.create({ ...user, id_tour: createdTour.getDataValue('id_tour') });
            }
        }

        res.status(201).json({ msg: 'Tour creat correctament', createdTour });
        return;
    } catch (error) {
        console.error('Error creant el tour', error);
        res.status(500).json({ msg: 'Error del servidor' });
        return;
    }
};


// MOFIFICAR
export const updateFullTour = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { tour, days, users } = req.body;

    try {
        const existingTour = await Tour.findByPk(id);
        if (!existingTour) {
            res.status(404).json({ msg: `No s'ha trobat cap tour amb l'id ${id}` });
            return;
        }

        await existingTour.update(tour);

        await Dia.destroy({ where: { id_tour: id } });
        if (days && Array.isArray(days) && days.length > 0) {
            for (const day of days) {
                await Dia.create({ ...day, id_tour: id });
            }
        }

        await User.destroy({ where: { id_tour: id } });
        if (users && Array.isArray(users) && users.length > 0) {
            for (const user of users) {
                await User.create({ ...user, id_tour: id });
            }
        }

        res.status(200).json({ msg: `Tour amb id ${id} actualitzat correctament` });
    } catch (error) {
        console.error('Error actualitzant el tour', error);
        res.status(500).json({ msg: 'Error del servidor. Si us plau, intenta-ho més tard.' });
    }
};

//ELIMINAR 
export const deleteFullTour = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const existingTour = await Tour.findByPk(id);
        if (!existingTour) {
            res.status(404).json({ msg: `No s'ha trobat el tour amb l'id ${id}` });
            return;
        }

        const deletedDays = await Dia.destroy({ where: { id_tour: id } });
        const deletedUsers = await User.destroy({ where: { id_tour: id } });

        await existingTour.destroy();
        res.status(200).json({ msg: `Tour amb l'id ${id} eliminat correctament` });
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor. Si us plau, intenta-ho més tard.' });
    }
};



//ACCIONS INDIVIDUALS (específiques)
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


//ADMIN FORM
//Retornem dies i usuaris associats a un Tour

export const getTourWithDetails = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const tour = await Tour.findByPk(id, {
            include: [
                { model: Dia, as: 'days' },
                { model: User, as: 'users' },
            ],
        });

        if (!tour) {
            res.status(404).json({ msg: 'Tour no trobat' });
            return;
        }

        const payload = {
            tour: {
                nom_tour: tour.nom_tour,
                imatge_tour: tour.imatge_tour,
                data_inici: tour.data_inici,
                data_final: tour.data_final,
                password: tour.password,
            },
            days: tour.days, // Incloure els dies
            users: tour.users, // Incloure els usuaris
        };

        res.json(payload);
    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor' });
    }
};





