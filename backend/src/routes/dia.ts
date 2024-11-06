import { Router } from 'express';
import { GetDiesByTour, getDia, createDia, updateDia, deleteDia } from '../controllers/diaController';

const diaRouter = Router();

diaRouter.get('/tour/:tourId', GetDiesByTour);
diaRouter.get('/:id', getDia);
diaRouter.post('/', createDia);
diaRouter.put('/:id', updateDia);
diaRouter.delete('/:id', deleteDia);

export default diaRouter;

