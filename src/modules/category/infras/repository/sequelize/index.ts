import { Sequelize } from "sequelize";
import { BaseRepositorySequlize } from "../../../../../shared/repository/base-repo-sequelize";
import { CondCategoryDTO, UpdateCategoryDTO } from "../../../model/dto";
import { Category } from "../../../model/model";
import { modelName } from "./category.persistence";


export class CategoryRepository extends BaseRepositorySequlize<Category, CondCategoryDTO, UpdateCategoryDTO> {
  constructor(sequelize: Sequelize) {
    super(sequelize, modelName);
  }
}