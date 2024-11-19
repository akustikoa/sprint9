import { Router } from 'express';
import { getTours, getTour, createTour, updateTour, deleteTour, verifyUserTourPassword, createFullTour, updateFullTour, deleteFullTour } from '../controllers/tourController';

const tourRouter = Router();

tourRouter.get('/', getTours);
tourRouter.get('/:id', getTour);
tourRouter.post('/', createTour);
tourRouter.put('/:id', updateTour);
tourRouter.delete('/:id', deleteTour);
tourRouter.post('/verify-user-tour', verifyUserTourPassword);
tourRouter.post('/create-full-tour', createFullTour);
tourRouter.put('/update-full-tour', updateFullTour);
tourRouter.delete('/delete-full-tour', deleteFullTour)

export default tourRouter;
