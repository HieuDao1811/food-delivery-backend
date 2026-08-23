import { Sequelize } from "sequelize";

import { Router } from "express";
import { CategoryRepository } from "./infras/repository";
import { CreateNewCategoryCmdHandler } from "./usecase/create-new-category";
import { CategoryHttpService } from "./infras/transport";
import { init } from "./infras/repository/sequelize/category.persistence";
import { GetDetailQueryHandler } from "./usecase/get-category-detail";
import { ListCategoryQueryHandler } from "./usecase/list-category";
import { UpdateCategoryCmdHandler } from "./usecase/update-category";
import { DeleteCategoryCmdHandler } from "./usecase/delete-category";
import { ServiceContext } from "../../shared/interface/service-context";
import { Role } from "../../shared/interface";

export const setupCategoryHexagon = (sequelize: Sequelize, sctx: ServiceContext) => {
  init(sequelize);

  const repository = new CategoryRepository(sequelize);
  const createCmdHandler = new CreateNewCategoryCmdHandler(repository);
  const getDetailQueryHandler = new GetDetailQueryHandler(repository);
  const listQueryHandler = new ListCategoryQueryHandler(repository);
  const updateCmdHandler = new UpdateCategoryCmdHandler(repository);
  const deleteCmdHandler = new DeleteCategoryCmdHandler(repository);

  const httpService = new CategoryHttpService(
    createCmdHandler,
    getDetailQueryHandler,
    listQueryHandler,
    updateCmdHandler,
    deleteCmdHandler
  );

  const router = Router();
  const mdlFactory = sctx.mdlFactory;
  const adminChecker = mdlFactory.allowRoles([Role.ADMIN])

  router.post('/categories', mdlFactory.auth, adminChecker, httpService.createAPI.bind(httpService));
  router.get('/categories/:id',  mdlFactory.auth, httpService.getAPI.bind(httpService));
  router.get('/categories',  mdlFactory.auth, httpService.listAPI.bind(httpService));
  router.patch('/categories/:id', mdlFactory.auth, adminChecker, httpService.updateAPI.bind(httpService));
  router.delete('/categories/:id', mdlFactory.auth, adminChecker, httpService.deleteAPI.bind(httpService));

  return router;
}
