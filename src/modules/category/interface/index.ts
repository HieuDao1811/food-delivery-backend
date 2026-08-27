import { PagingDTO } from "../../../shared/model/paging";
import { BaseRepositorySequlize } from "../../../shared/repository/base-repo-sequelize";
import { CondCategoryDTO, CreateCategoryDTO, UpdateCategoryDTO } from "../model/dto";
import { Category } from "../model/model";

export interface CreateCommand {
  cmd: CreateCategoryDTO
}

export interface GetDetailQuery {
  id: string
}

export interface ListQuery {
  cond: CondCategoryDTO,
  paging: PagingDTO
}

export interface UpdateCommand {
  id: string,
  cmd: UpdateCategoryDTO
}

export interface DeleteCommand {
  id: string
}

export interface ICategoryRepository extends BaseRepositorySequlize<Category, CondCategoryDTO, UpdateCategoryDTO> {
  listAll(): Promise<Array<Category>>;
  validateIds(ids: string[]): Promise<boolean>;
}
