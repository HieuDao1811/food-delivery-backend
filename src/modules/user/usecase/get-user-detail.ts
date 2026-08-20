import { IQueryHandler } from "../../../shared/interface";
import { GetUserDetailQuery, IUserRepository } from "../interface";
import { ErrorUserNotFound } from "../model/error";
import { User } from "../model/model";

export class GetUserDetailQueryHandler implements IQueryHandler<GetUserDetailQuery, User> {
  constructor(private readonly repository: IUserRepository) {}

  async query(query: GetUserDetailQuery): Promise<User> {
    const user = await this.repository.get(query.id);

    if (!user) {
      throw ErrorUserNotFound;
    }

    return user;
  }
}