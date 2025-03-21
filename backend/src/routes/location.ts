import { Router } from 'express';
import { getLocationByTour, createLocation, updateLocation, deleteLocation } from '../controllers/locationController';

const locationRouter = Router();

locationRouter.get('/tour/:id_tour', getLocationByTour);
/* locationRouter.post('/', createLocation);
locationRouter.put('/:id_location', updateLocation);
locationRouter.delete('/:id_location', deleteLocation); */

export default locationRouter;