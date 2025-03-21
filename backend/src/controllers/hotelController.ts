import { Request, Response } from "express";
import Hotel from '../models/hotel';

export const getHotelByTour = async (req: Request, res: Response) => {
    try {
        const { id_tour } = req.params;
        const hotels = await Hotel.findAll({ where: { id_tour } });

        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving hotels', error });
    }
};

export const createHotel = async (req: Request, res: Response) => {
    try {
        const hotel = await Hotel.create(req.body);
        res.json({ message: 'Hotel created successfully', hotel });
    } catch (error) {
        res.status(500).json({ message: 'Error creating hotel', error });
    }
};

export const updateHotel = async (req: Request, res: Response) => {
    try {
        const { id_hotel } = req.params;
        const hotel = await Hotel.findByPk(id_hotel);

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        await hotel.update(req.body);
        res.json({ message: 'Hotel update successfuly', hotel });
    } catch (error) {
        res.status(500).json({ message: 'Error updating hotel', error });
    }
};

export const deleteHotel = async (req: Request, res: Response) => {
    try {
        const { id_hotel } = req.params;
        const hotel = await Hotel.findByPk(id_hotel);

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel nod found' });
        }

        await hotel.destroy();
        res.json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting hotel', error });
    }
};