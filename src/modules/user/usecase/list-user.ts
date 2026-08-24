import { IQueryHandler } from "../../../shared/interface";
import { IUserRepository, ListUserQuery } from "../interface";
import { User } from "../model/user";

export class ListUserQueryHandler implements IQueryHandler<ListUserQuery, Array<User>> {
  constructor(private readonly repository: IUserRepository) {} 

  async query(query: ListUserQuery): Promise<Array<User>> {
    const cond = query.cond;
    const paging = query.paging;

    const collection = await this.repository.list(cond, paging);
    
    return collection;
  }
}