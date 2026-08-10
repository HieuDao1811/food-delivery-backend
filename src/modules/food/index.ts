import { Router } from 'express';
import { getFood } from './infras/get';
import { listFood } from './infras/list';
import { createFood } from './infras/create';
import { updateFood } from './infras/update';
import { deleteFood } from './infras/delete';

export const setupFoodModule = () => {
  const router = Router();

  router.get('/foods', listFood);
  router.get('/food/:id', getFood);
  router.post('/foods', createFood);
  router.patch('/foods/:id', updateFood);
  router.delete('foods/:id', deleteFood);

  return router;
}