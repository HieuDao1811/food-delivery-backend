import { Router } from 'express';

import { Sequelize } from 'sequelize';
import { FoodRepository } from './infras/repository/sequelize';
import { FoodHttpService } from './infras/transport';
import { init } from './infras/repository/sequelize/food.persistence';
import { CreateNewFoodCmdHandler } from './usecase/create-new-food';
import { GetFoodDetailCmdHandler } from './usecase/get-food-detail';
import { UpdateFoodCmdHandler } from './usecase/update-food';
import { DeleteFoodCmdHandler } from './usecase/delete-food';
import { ListFoodQueryHandler } from './usecase/list-food';

export const setupFoodHexagon = (sequelize: Sequelize) => {
  init(sequelize);

  const repository = new FoodRepository(sequelize);


  const createCmdHandler = new CreateNewFoodCmdHandler(repository);
  const getDetailQueryHandler = new GetFoodDetailCmdHandler(repository);
  const listQueryHandler = new ListFoodQueryHandler(repository);
  const updateCmdHandler = new UpdateFoodCmdHandler(repository);
  const deleteCmdHandler = new DeleteFoodCmdHandler(repository);

  const httpService = new FoodHttpService(
    createCmdHandler, 
    getDetailQueryHandler, 
    listQueryHandler,
    updateCmdHandler,
    deleteCmdHandler
  );

  const router = Router();

  router.get('/foods', httpService.listAPI.bind(httpService));
  router.get('/foods/:id', httpService.getDetailAPI.bind(httpService));
  router.post('/foods', httpService.createAPI.bind(httpService));
  router.patch('/foods/:id', httpService.updateAPI.bind(httpService));
  router.delete('/foods/:id', httpService.deleteAPI.bind(httpService));

  return router;
}
