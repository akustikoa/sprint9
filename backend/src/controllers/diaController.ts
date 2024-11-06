//gestió dies (taula dies)

import { Request, Response } from 'express';
import Dia from '../models/dia';

//obtenir tots els dies d'un tour 
export const GetDiesByTour = async (req: Request, res: Response) => {
    const { tourID } = req.params; // s'espera que tourID sigui part de l'URL 
    const dies = await Dia.findAll({ where: { id_tour: tourID } });
    res.json(dies);
};

//Obtenir un dia específic
export const getDia = async (req: Request, res: Response) => {
    const { id } = req.params; // s'espera que ID sigui part de l'URL
    const dia = await Dia.findByPk(id); // consultem la BD la clau primària única id
    if (dia) {
        res.json(dia); // si es troba es mostra 
    } else {
        res.status(404).json({ msg: `no s'ha trobat el dia am id ${id}` }); //si no es troba es mostra miss. err.
    }
};

//Crear un dia per a un tour 
export const createDia = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const dia = await Dia.create(body);
        res.json(dia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creant el dia' });
    }
};


//Actualitzar un dia 
export const updateDia = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    const dia = await Dia.findByPk(id);
    if (dia) {
        await dia.update(body);
        res.json(dia);
    } else {
        res.status(404).json({ msg: `No s'ha trobat el dia amb id ${id}` });
    }
};

//Eliminar un dia

export const deleteDia = async (req: Request, res: Response) => {
    const { id } = req.params;
    const dia = await Dia.findByPk(id);
    if (dia) {
        await dia.destroy();
        res.json({ msg: `El dia amb ${id} s'ha suprimit` });
    } else {
        res.status(404).json({ msg: `No s'ha trobat el dia amb id ${id}` });
    }
};