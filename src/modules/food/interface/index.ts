import { ICommandHandler } from "../../../shared/interface";
import { PagingDTO } from "../../../shared/model/paging";
import { BaseRepositorySequlize } from "../../../shared/repository/base-repo-sequelize";
import { CreateFoodDTO, FoodCondDTO, UpdateFoodDTO } from "../model/dto";
import { Food } from "../model/model";

export interface CreateCommand {
  cmd: CreateFoodDTO
}

export interface GetDetailQuery {
  id: string
}

export interface ListQuery {
  cond: FoodCondDTO,
  paging: PagingDTO
} 

export interface UpdateCommand {
  id: string,
  cmd: UpdateFoodDTO
}

export interface DeleteCommand {
  id: string
}

export interface GetByIdQuery {
  id: string
}

export interface ListByIdsQuery {
  ids: string[]
}



export interface IFoodRepository extends BaseRepositorySequlize<Food, FoodCondDTO, UpdateFoodDTO> {}