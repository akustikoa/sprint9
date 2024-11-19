import { Router } from 'express';
import { getTours, getTour, createTour, updateTour, deleteTour, verifyUserTourPassword } from '../controllers/tourController';

const tourRouter = Router();

tourRouter.get('/', getTours);
tourRouter.get('/:id', getTour);
tourRouter.post('/', createTour);
tourRouter.put('/:id', updateTour);
tourRouter.delete('/:id', deleteTour);
tourRouter.post('/verify-user-tour', verifyUserTourPassword);

export default tourRouter;
