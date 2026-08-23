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
import { ServiceContext } from '../../shared/interface/service-context';
import { Role } from '../../shared/interface';

export const setupFoodHexagon = (sequelize: Sequelize, sctx: ServiceContext) => {
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
  const mdlFactory = sctx.mdlFactory;
  const checkAdmin = mdlFactory.allowRoles([Role.ADMIN, Role.EMPLOYEE]);

  router.get('/foods', mdlFactory.auth, httpService.listAPI.bind(httpService));
  router.get('/foods/:id', mdlFactory.auth, httpService.getDetailAPI.bind(httpService));
  router.post('/foods', mdlFactory.auth, checkAdmin, httpService.createAPI.bind(httpService));
  router.patch('/foods/:id', mdlFactory.auth, checkAdmin, httpService.updateAPI.bind(httpService));
  router.delete('/foods/:id', mdlFactory.auth, checkAdmin, httpService.deleteAPI.bind(httpService));

  return router;
}
