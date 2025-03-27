import { Router } from 'express';
import { getDiscoverByTour, createDiscover, updateDiscover, deleteDiscover } from '../controllers/discoverController';

const discoverRouter = Router();

discoverRouter.get('/tour/:id_tour', getDiscoverByTour);
discoverRouter.post('/', createDiscover);
/* discoverRouter.put('/:id_discover', updateDiscover);
discoverRouter.delete('/:id_discover', deleteDiscover); */

export default discoverRouter;
