import { Router } from 'express';
import { getFood } from './infras/transport/get';
import { listFood } from './infras/transport/list';
import { createFood } from './infras/transport/create';
import { updateFood } from './infras/transport/update';
import { deleteFood } from './infras/transport/delete';

export const setupFoodModule = () => {
  const router = Router();

  router.get('/foods', listFood);
  router.get('/food/:id', getFood);
  router.post('/foods', createFood);
  router.patch('/foods/:id', updateFood);
  router.delete('foods/:id', deleteFood);

  return router;
}