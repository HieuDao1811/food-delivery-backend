import { Sequelize } from "sequelize";
import { init } from "./infras/repository/sequelize/user.persistence";
import { RegisterUserCmdHandler } from "./usecase/register-user";
import { UserRepository } from "./infras/repository";
import { Router } from "express";
import { UserHttpService } from "./infras/transport";
import { CreateNewUserCmdHandler } from "./usecase/create-new-user";
import { ListUserQueryHandler } from "./usecase/list-user";
import { GetUserDetailQueryHandler } from "./usecase/get-user-detail";
import { UpdateUserCmdHandler } from "./usecase/update-user";

export const setupUserHexagon = (sequelize: Sequelize) => {
  init(sequelize);

  const repository = new UserRepository(sequelize);

  const registerCommandHandler = new RegisterUserCmdHandler(repository);
  const createCommandHandler = new CreateNewUserCmdHandler(repository);
  const listQueryHandler = new ListUserQueryHandler(repository);
  const getDetailQueryHandler = new GetUserDetailQueryHandler(repository);
  const updateCommandHandler = new UpdateUserCmdHandler(repository);

  const httpService = new UserHttpService(
    registerCommandHandler,
    getDetailQueryHandler,
    listQueryHandler,
    createCommandHandler,
    updateCommandHandler
  )

  const router = Router();

  router.post('/register', httpService.registerAPI.bind(httpService));
  
  router.get('/users/:id', httpService.getDetailAPI.bind(httpService));
  router.get('/users', httpService.listAPI.bind(httpService));
  router.post('/users', httpService.createAPI.bind(httpService));
  router.patch('/users/:id', httpService.updateAPI.bind(httpService));

  return router;
}