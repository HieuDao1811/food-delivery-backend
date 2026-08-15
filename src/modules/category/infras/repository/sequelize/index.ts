import { Sequelize } from "sequelize";
import { BaseRepositorySequlize } from "../../../../../shared/repository/base-repo-sequelize";
import { CondCategoryDTO, UpdateCategoryDTO } from "../../../model/dto";
import { Category } from "../../../model/model";
import { modelName } from "./category.persistence";
import { PagingDTO } from "../../../../../shared/model/paging";


export class CategoryRepository extends BaseRepositorySequlize<Category, CondCategoryDTO, UpdateCategoryDTO> {
  constructor(sequelize: Sequelize) {
    super(sequelize, modelName);
  }

  async listAll(): Promise<Array<Category>> {
    const rows = await this.sequelize.models[this.modelName].findAll({
      order: [["createdAt", "ASC"]]
    });

    return rows.map(row => row.get({ plain: true }) as Category);
  }

  async list(cond: CondCategoryDTO, paging: PagingDTO): Promise<Array<Category>> {
    const { page, limit } = paging;
    const condSQL = { ...cond };

    const total = await this.sequelize.models[this.modelName].count({ where: condSQL });
    paging.total = total;

    const rows = await this.sequelize.models[this.modelName].findAll({
      where: condSQL,
      limit,
      offset: (page - 1) * limit
    });

    return rows.map(row => row.get({ plain: true }) as Category);
  }

  async delete(id: string): Promise<boolean> {
    const affected = await this.sequelize.models[this.modelName].destroy({ where: { id } });
    return affected > 0;
  }
}
