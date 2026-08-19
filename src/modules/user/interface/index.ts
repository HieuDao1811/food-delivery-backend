import { BaseRepositorySequlize } from "../../../shared/repository/base-repo-sequelize";
import { CreateUserDTO, RegisterUserDTO, UpdateUserDTO, UserCondDTO } from "../model/dto";
import { User } from "../model/model";

export interface RegisterUserCommand {
  cmd: RegisterUserDTO
}

export interface CreateUserCommand {
  cmd: CreateUserDTO
}

export interface IUserRepository extends BaseRepositorySequlize<User, UserCondDTO, UpdateUserDTO> {}