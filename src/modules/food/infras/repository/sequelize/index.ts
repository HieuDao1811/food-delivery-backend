import { Op, Sequelize } from "sequelize";
import { PagingDTO } from "../../../../../shared/model/paging";
import { FoodCondDTO, UpdateFoodDTO } from "../../../model/dto";
import { Food } from "../../../model/model";
import { BaseRepositorySequlize } from "../../../../../shared/repository/base-repo-sequelize";
import { modelName } from "./food.persistence";

// implement ORM here (Sequelize)

export class FoodRepository extends BaseRepositorySequlize<Food, FoodCondDTO, UpdateFoodDTO> {
  constructor(sequelize: Sequelize) {
    super(sequelize, modelName);
  }

  async list(cond: FoodCondDTO, paging: PagingDTO): Promise<Array<Food>> {
    const { page, limit } = paging;

    const where = {
      isAvailable: 1,
      ...(cond.name && {
        name: {
          [Op.like]: `%${cond.name}%`
        }
      }) 
    };

    const total = await this.model.count({ where });
    paging.total = total;

    const rows = await this.model.findAll({
      where,
      offset: (page - 1) * limit,
      limit
    });

    return rows.map(row => row.get({ plain: true }) as Food);
  }
}
