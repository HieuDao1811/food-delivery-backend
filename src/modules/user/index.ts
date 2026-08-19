import { Sequelize } from "sequelize";
import { init } from "./infras/repository/sequelize/user.persistence";
import { RegisterUserCmdHandler } from "./usecase/register-user";
import { UserRepository } from "./infras/repository";
import { Router } from "express";
import { UserHttpService } from "./infras/transport";

export const setupUserHexagon = (sequelize: Sequelize) => {
  init(sequelize);

  const repository = new UserRepository(sequelize);
  const registerCommandHandler = new RegisterUserCmdHandler(repository);
  const httpService = new UserHttpService(
    registerCommandHandler
  )

  const router = Router();

  router.post('/register', httpService.registerAPI.bind(httpService));

  return router;
}