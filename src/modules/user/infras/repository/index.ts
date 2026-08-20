import { Sequelize } from "sequelize";
import { BaseRepositorySequlize } from "../../../../shared/repository/base-repo-sequelize";
import { CondUserDTO, UpdateUserDTO } from "../../model/dto";
import { User, UserStatus } from "../../model/model";
import { modelName } from "./sequelize/user.persistence";
import { PagingDTO } from "../../../../shared/model/paging";

export class UserRepository extends BaseRepositorySequlize<User, CondUserDTO, UpdateUserDTO> {
  constructor(sequelize: Sequelize) {
    super(sequelize, modelName);
  }
  
  async list(cond: CondUserDTO, paging: PagingDTO): Promise<Array<User>> {
    const { page, limit } = paging;
    const offset = (page - 1) * limit;
    const condSQL = { ...cond, status: UserStatus.ACTIVE };

    const model = this.sequelize.models[this.modelName];

    if (!model) {
      throw new Error(`Model ${this.modelName} not found`);
    }

    const total = await model.count({ where: condSQL });
    paging.total = total;

    const rows = await model.findAll({ where: condSQL, limit, offset });
    const data = rows.map(row => row.get({ plain: true }) as User);

    return rows.map(row => row.get({ plain: true }) as User);
  }
}