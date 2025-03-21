import { Router } from 'express';
import { getHotelByTour, createHotel, updateHotel, deleteHotel } from '../controllers/hotelController';



const hotelRouter = Router();

hotelRouter.get('/tour/:id_tour', getHotelByTour);
/* hotelRouter.post('/', createHotel);
hotelRouter.put('/:id_hotel', updateHotel);
hotelRouter.delete('/:id_hotel', deleteHotel); */

export default hotelRouter;