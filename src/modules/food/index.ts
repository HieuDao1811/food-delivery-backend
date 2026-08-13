import { Router } from 'express';
import { init, modelName } from './infras/repository/food.persistence';
import { Sequelize } from 'sequelize';
import { FoodHttpService } from './infras/transport/http-service';
import { FoodUseCase } from './usecase';
import { MySQLFoodRepository } from './infras/repository/repo';

export const setupFoodModule = (sequelize: Sequelize) => {
  init(sequelize);

  return setupFoodHexagon(sequelize, false);
};

export const setupFoodHexagon = (sequelize: Sequelize, initialize = true) => {
  if (initialize) init(sequelize);

  const repository = new MySQLFoodRepository(sequelize, modelName);
  const useCase = new FoodUseCase(repository);
  const httpService = new FoodHttpService(useCase);

  const router = Router();

  router.get('/foods', httpService.listFoodsAPI.bind(httpService));
  router.get('/foods/:id', httpService.getDetailFoodAPI.bind(httpService));
  router.post('/foods', httpService.createANewFoodAPI.bind(httpService));
  router.patch('/foods/:id', httpService.updateFoodAPI.bind(httpService));
  router.delete('/foods/:id', httpService.deleteFoodAPI.bind(httpService));

  return router;
}
