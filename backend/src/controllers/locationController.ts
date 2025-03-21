import { Request, Response } from 'express';
import Location from '../models/location';

export const getLocationByTour = async (req: Request, res: Response) => {
    try {
        const { id_tour } = req.params;
        const locations = await Location.findAll({ where: { id_tour } });

        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving locations', error });
    }
};

export const crateLocation = async (req: Request, res: Response) => {
    try {
        const location = await Location.create(req.body);
        res.json({ message: 'Location created successfully', location });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Location', error });
    }
}

export const updateLocation = async (req: Request, res: Response) => {
    try {
        const { id_location } = req.params;
        const location = await Location.findByPk(id_location);

        if (!location) {
            res.status(404).json({ message: 'Location not found' });
        }

        await location?.update(req.body);
        res.json({ message: 'Location update successfully', location });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Location', error });
    }
};

export const deleteLocation = async (req: Request, res: Response) => {
    try {
        const { id_location } = req.params;
        const location = await Location.findByPk(id_location);


        if (!location) {
            return res.status(404).json({ message: 'Location nof found' });
        }

        await Location.destroy();
        res.json({ message: 'Location deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error deletin Location', error });
    }
};