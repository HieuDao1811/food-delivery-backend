import { BaseRepositorySequlize } from "../../../shared/repository/base-repo-sequelize";
import { RegisterUserDTO, UserCondDTO, UserUpdateDTO } from "../model/dto";
import { User } from "../model/model";

export interface RegisterUserCommand {
  cmd: RegisterUserDTO
}

export interface IUserRepository extends BaseRepositorySequlize<User, UserCondDTO, UserUpdateDTO> {}