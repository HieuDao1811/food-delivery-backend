import { Router } from 'express';
import { getFood } from './infras/transport/get';
import { listFood } from './infras/transport/list';
import { createFood } from './infras/transport/create';
import { updateFood } from './infras/transport/update';
import { deleteFood } from './infras/transport/delete';
import { init, modelName } from './infras/repository/food.persistence';
import { Sequelize } from 'sequelize';
import { FoodHttpService } from './infras/transport/http-service';
import { FoodUseCase } from './usecase';
import { MySQLFoodRepository } from './infras/repository/repo';

export const setupFoodModule = (sequelize: Sequelize) => {
  init(sequelize);

  const router = Router();

  router.get('/foods', listFood);
  router.get('/foods/:id', getFood);
  router.post('/foods', createFood);
  router.patch('/foods/:id', updateFood);
  router.delete('/foods/:id', deleteFood);

  return router;
};

export const setupFoodHexagon = (sequelize: Sequelize) => {
  init(sequelize);

  const repository = new MySQLFoodRepository(sequelize, modelName);
  const useCase = new FoodUseCase(repository);
  const httpService = new FoodHttpService(useCase);

  const router = Router();

  router.get('/foods', listFood);
  router.get('/foods/:id', getFood);
  router.post('/foods', httpService.createANewFoodAPI.bind(httpService));
  router.patch('/foods/:id', updateFood);
  router.delete('/foods/:id', deleteFood);

  return router;
}