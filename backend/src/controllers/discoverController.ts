import { Request, Response } from "express";
import Discover from '../models/discover';

export const getDiscoverByTour = async (req: Request, res: Response) => {
    try {
        const { id_tour } = req.params;
        const discovers = await Discover.findAll({ where: { id_tour } });

        res.json(discovers);
    } catch (error) {
        res.status(500).json({ message: 'Error carregant discover', error });
    }
};

export const createDiscover = async (req: Request, res: Response) => {
    try {
        const discover = await Discover.create(req.body);
        res.json({ message: 'Discover creat correctament', discover });
    } catch (error) {
        res.status(500).json({ message: 'Error creant discover', error });
    }
};

export const updateDiscover = async (req: Request, res: Response) => {
    try {
        const { id_discover } = req.params;
        const discover = await Discover.findByPk(id_discover);

        if (!discover) {
            return res.status(404).json({ message: 'No s\'ha trobat el discover' });
        }

        await discover.update(req.body);
        res.json({ message: 'Discover actualitzat correctament', discover });
    } catch (error) {
        res.status(500).json({ message: 'Error actualitzant discover', error });
    }
};

export const deleteDiscover = async (req: Request, res: Response) => {
    try {
        const { id_discover } = req.params;
        const discover = await Discover.findByPk(id_discover);

        if (!discover) {
            return res.status(404).json({ message: 'No s\'ha trobat el discover' });
        }

        await discover.destroy();
        res.json({ message: 'Discover eliminat correctament' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminant discover', error });
    }
};
