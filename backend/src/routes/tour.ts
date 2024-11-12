import { Router } from 'express';
import { getTours, getTour, createTour, updateTour, deleteTour, verifyTourPassword } from '../controllers/tourController';

const tourRouter = Router();

tourRouter.get('/', getTours);
tourRouter.get('/:id', getTour);
tourRouter.post('/', createTour);
tourRouter.put('/:id', updateTour);
tourRouter.delete('/:id', deleteTour);
tourRouter.post('/verify-password', verifyTourPassword)

export default tourRouter;
