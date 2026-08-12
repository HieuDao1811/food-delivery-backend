import { Sequelize } from "sequelize";
import { PagingDTO } from "../../../../shared/model/paging";
import { IRepository } from "../../interface";
import { CreateFood, FoodCondDTO, UpdateFood } from "../../model/dto";
import { Food } from "../../model/model";

// implement ORM here (Sequelize)

export class MySQLFoodRepository implements IRepository {
  constructor(private readonly sequelize: Sequelize, private readonly modelName: string) {}

  async get(id: string): Promise<Food | null> {
    return await this.sequelize.models[this.modelName].findByPk(id);
  }
  list(cond: FoodCondDTO, paging: PagingDTO): Promise<Array<Food>> {
    throw new Error("Method not implemented.");
  }
  async insert(data: CreateFood): Promise<boolean> {
    await this.sequelize.models[this.modelName].create(data);
    return true;
  }
  update(id: string, data: UpdateFood): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}