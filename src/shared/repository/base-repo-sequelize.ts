import { Sequelize } from "sequelize";
import { IRepository } from "../interface";
import { PagingDTO } from "../model/paging";

export abstract class BaseRepositorySequlize<Entity, Condition, UpdateDTO> implements IRepository<Entity, Condition, UpdateDTO> {
  constructor(protected readonly sequelize: Sequelize, protected readonly modelName: string) {}

  async get(id: string): Promise<Entity | null> {
    const data = await this.sequelize.models[this.modelName].findByPk(id);

    if(!data) {
      return null;
    }

    return data.get({ plain: true }) as Entity;
  }

  async list(cond: Condition, paging: PagingDTO): Promise<Array<Entity>> {
    const { page, limit } = paging;

    const condSQL = {...cond, isAvailable: 1};

    const total = await this.sequelize.models[this.modelName].count({ where: condSQL });
    paging.total = total;

    const rows = await this.sequelize.models[this.modelName].findAll({ where: condSQL });

    return rows.map(row => row.get({ plain: true }) as Entity);
  }

  async findByCond(cond: Condition): Promise<Entity | null> {
    const data = await this.sequelize.models[this.modelName].findOne({ where: cond as any });
    
    if(!data) {
      return null;
    }

    return data.get({ plain: true }) as Entity;
  }

  async insert(data: Entity): Promise<boolean> {
    await this.sequelize.models[this.modelName].create(data as any);
    return true;
  }

  async update(id: string, data: UpdateDTO): Promise<boolean> {
    const [affected] = await this.sequelize.models[this.modelName].update(data as any, { where: { id } });

    return affected > 0;
  }

  async delete(id: string): Promise<boolean> {
    const [affected] = await this.sequelize.models[this.modelName].update({ isAvailable: 0 }, { where: { id } });

    return affected > 0;
  }
}
