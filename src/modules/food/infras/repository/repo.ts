import { Op, Sequelize } from "sequelize";
import { PagingDTO } from "../../../../shared/model/paging";
import { IRepository } from "../../interface";
import { FoodCondDTO, UpdateFood } from "../../model/dto";
import { Food, FoodSchema } from "../../model/model";

// implement ORM here (Sequelize)

export class MySQLFoodRepository implements IRepository {
  constructor(private readonly sequelize: Sequelize, private readonly modelName: string) {}

  async get(id: string): Promise<Food | null> {
    const data = await this.sequelize.models[this.modelName].findByPk(id);

    if (!data) {
      return null;
    }

    return FoodSchema.parse(data.get({ plain: true }));
  }
  async list(cond: FoodCondDTO, paging: PagingDTO): Promise<Array<Food>> {
    const where: Record<string, unknown> = { isAvailable: cond.isAvailable };
    if (cond.name) where.name = { [Op.like]: `%${cond.name}%` };

    const rows = await this.sequelize.models[this.modelName].findAll({
      where,
      limit: paging.limit,
      offset: (paging.page - 1) * paging.limit,
      order: [[Sequelize.col("created_at"), "DESC"]]
    });
    return rows.map((row) => FoodSchema.parse(row.get({ plain: true })));
  }
  async insert(data: Food): Promise<boolean> {
    await this.sequelize.models[this.modelName].create(data);
    return true;
  }
  async update(id: string, data: UpdateFood): Promise<boolean> {
    const [affected] = await this.sequelize.models[this.modelName].update(data, { where: { id } });
    return affected > 0;
  }
  async delete(id: string): Promise<boolean> {
    const [affected] = await this.sequelize.models[this.modelName].update(
      { isAvailable: 0 },
      { where: { id, isAvailable: 1 } }
    );
    return affected > 0;
  }

}
