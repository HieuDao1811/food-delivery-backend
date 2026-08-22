import { Sequelize } from "sequelize";
import { init } from "./infras/repository/sequelize/user.persistence";
import { RegisterUserCmdHandler } from "./usecase/register-user";
import { UserRepository } from "./infras/repository/sequelize";
import { Router } from "express";
import { UserHttpService } from "./infras/transport";
import { CreateNewUserCmdHandler } from "./usecase/create-new-user";
import { ListUserQueryHandler } from "./usecase/list-user";
import { GetUserDetailQueryHandler } from "./usecase/get-user-detail";
import { UpdateUserCmdHandler } from "./usecase/update-user";
import { DeleteUserCmdHandler } from "./usecase/delete-user";
import { LoginCommandHandler } from "./usecase/login";
import { ProfileUserQueryHandler } from "./usecase/profile";
import { VerifyTokenQueryHandler } from "./usecase/verify-token";

export const setupUserHexagon = (sequelize: Sequelize) => {
  init(sequelize);

  const repository = new UserRepository(sequelize);

  const registerCommandHandler = new RegisterUserCmdHandler(repository);
  const loginCommandHandler = new LoginCommandHandler(repository);
  const profileQueryHandler = new ProfileUserQueryHandler(repository);

  const createCommandHandler = new CreateNewUserCmdHandler(repository);
  const listQueryHandler = new ListUserQueryHandler(repository);
  const getDetailQueryHandler = new GetUserDetailQueryHandler(repository);
  const updateCommandHandler = new UpdateUserCmdHandler(repository);
  const deleteCommandHandler = new DeleteUserCmdHandler(repository);
  const verifyTokenQueryHandler = new VerifyTokenQueryHandler(repository);

  const httpService = new UserHttpService(
    registerCommandHandler,
    loginCommandHandler,
    profileQueryHandler,
    getDetailQueryHandler,
    listQueryHandler,
    createCommandHandler,
    updateCommandHandler,
    deleteCommandHandler,
    verifyTokenQueryHandler
  )

  const router = Router();

  router.post('/register', httpService.registerAPI.bind(httpService));
  router.post('/authenticate', httpService.loginAPI.bind(httpService));
  router.get('/profile', httpService.profileAPI.bind(httpService));
  
  router.get('/users/:id', httpService.getDetailAPI.bind(httpService));
  router.get('/users', httpService.listAPI.bind(httpService));
  router.post('/users', httpService.createAPI.bind(httpService));
  router.patch('/users/:id', httpService.updateAPI.bind(httpService));
  router.delete('/users/:id', httpService.deleteAPI.bind(httpService));

  // rpc use internally
  router.post('/rpc/introspect', httpService.introspectAPI.bind(httpService));
  return router;
}