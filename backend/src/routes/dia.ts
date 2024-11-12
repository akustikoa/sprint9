import { Router } from 'express';
import { getDiesByTour, getDia, createDia, updateDia, deleteDia } from '../controllers/diaController';

const diaRouter = Router();

diaRouter.get('/tour/:tourId', getDiesByTour);
diaRouter.get('/:id', getDia);
diaRouter.post('/', createDia);
diaRouter.put('/:id', updateDia);
diaRouter.delete('/:id', deleteDia);

export default diaRouter;

