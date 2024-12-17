import { Router } from 'express';
import {
    getTours, getTour, createTour, updateTour, deleteTour, verifyUserTourPassword, createFullTour,
    updateFullTour, deleteFullTour, getTourWithDetails
} from '../controllers/tourController';

const tourRouter = Router();

tourRouter.get('/', getTours);
tourRouter.get('/:id', getTour);
tourRouter.post('/', createTour);
tourRouter.put('/:id', updateTour);
tourRouter.delete('/:id', deleteTour);
tourRouter.post('/verify-user-tour', verifyUserTourPassword);
tourRouter.post('/create-full-tour', createFullTour);
tourRouter.put('/update-full-tour/:id', updateFullTour);
tourRouter.delete('/delete-full-tour/:id', deleteFullTour);
tourRouter.get('/details/:id', getTourWithDetails);

export default tourRouter;
