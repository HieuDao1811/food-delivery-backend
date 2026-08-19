import { IQueryHandler } from "../../../shared/interface";
import { ErrorInvalidPaging } from "../../../shared/model/base-error";
import { PagingSchema } from "../../../shared/model/paging";
import { IUserRepository, ListUserQuery } from "../interface";
import { CondUserSchema } from "../model/dto";
import { ErrorInvalidUserCondition } from "../model/error";
import { User } from "../model/model";

export class ListUserQueryHandler implements IQueryHandler<ListUserQuery, Array<User>> {
  constructor(private readonly repository: IUserRepository) {} 

  async query(query: ListUserQuery): Promise<Array<User>> {
    const cond = query.cond;
    const paging = query.paging;

    const collection = await this.repository.list(cond, paging);
    
    return collection;
  }
}