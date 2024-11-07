import { Router } from 'express';
import { getRecorregutsByDia, getRecorregut, createRecorregut, updateRecorregut, deleteRecorregut } from '../controllers/recorregutController'

const recorregutRouter = Router();

recorregutRouter.get('/dia/:diaId', getRecorregutsByDia);
recorregutRouter.get('/:id', getRecorregut);
recorregutRouter.post('/', createRecorregut);
recorregutRouter.put('/:id', updateRecorregut);
recorregutRouter.delete('/id', deleteRecorregut);

export default recorregutRouter;