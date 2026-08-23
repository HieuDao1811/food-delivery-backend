import { PagingDTO } from "../../../shared/model/paging";
import { BaseRepositorySequlize } from "../../../shared/repository/base-repo-sequelize";
import { CondUserDTO, CreateUserDTO, LoginUserDTO, RegisterUserDTO, UpdateAccountDTO, UpdateUserDTO } from "../model/dto";
import { User } from "../model/model";

export interface RegisterUserCommand {
  cmd: RegisterUserDTO
}

export interface CreateUserCommand {
  cmd: CreateUserDTO
}

export interface ListUserQuery {
  cond: CondUserDTO,
  paging: PagingDTO
}

export interface GetUserDetailQuery {
  id: string
}

export interface UpdateUserCommand {
  id: string,
  cmd: UpdateUserDTO
}

export interface DeleteUserCommand {
  id: string
}

export interface LoginCommand {
  cmd: LoginUserDTO
}

export interface ProfileQuery {
  id: string
}

export interface VerifyTokenQuery {
  token: string
}

export interface UpdateAccountCmd {
  id: string,
  cmd: UpdateAccountDTO
}

export interface IUserRepository extends BaseRepositorySequlize<User, CondUserDTO, UpdateUserDTO> {}