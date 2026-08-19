import { Sequelize } from "sequelize";
import { BaseRepositorySequlize } from "../../../../shared/repository/base-repo-sequelize";
import { UserCondDTO, UserUpdateDTO } from "../../model/dto";
import { User } from "../../model/model";
import { modelName } from "./sequelize/user.persistence";

export class UserRepository extends BaseRepositorySequlize<User, UserCondDTO, UserUpdateDTO> {
  constructor(sequelize: Sequelize) {
    super(sequelize, modelName);
  }
  
  
}