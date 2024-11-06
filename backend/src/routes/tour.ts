import { Router } from 'express';
import { getTours, getTour, postTour, deleteTour } from '../controllers/tourController';

const tourRouter = Router();

tourRouter.get('/', getTours);
tourRouter.get('/:id', getTour);
tourRouter.post('/', postTour);
tourRouter.delete('/:id', deleteTour);

export default tourRouter;
