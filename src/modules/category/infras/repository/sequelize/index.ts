import { Sequelize } from "sequelize";
import { PagingDTO } from "../../../../../shared/model/paging";
import { modelName } from "./category.persistence";
import { Category } from "../../../model/model";
import { BaseRepositorySequlize } from "../../../../../shared/repository/base-repo-sequelize";
import { CondCategoryDTO, UpdateCategoryDTO } from "../../../model/dto";


export class CategoryRepository extends BaseRepositorySequlize<Category, CondCategoryDTO, UpdateCategoryDTO> {
  constructor(sequelize: Sequelize) {
    super(sequelize, modelName);
  }

  async listAll(): Promise<Array<Category>> {
    const rows = await this.model.findAll({
      order: [["createdAt", "ASC"]]
    });

    return rows.map(row => row.get({ plain: true }) as Category);
  }

  async list(cond: CondCategoryDTO, paging: PagingDTO): Promise<Array<Category>> {
    const { page, limit } = paging;
    const condSQL = { ...cond };

    const total = await this.model.count({ where: condSQL });
    paging.total = total;

    const rows = await this.model.findAll({
      where: condSQL,
      limit,
      offset: (page - 1) * limit
    });

    return rows.map(row => row.get({ plain: true }) as Category);
  }

  async delete(id: string): Promise<boolean> {
    const affected = await this.model.destroy({ where: { id } });
    return affected > 0;
  }
}
