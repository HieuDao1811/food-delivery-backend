import { IQueryHandler } from "../../../shared/interface";
import { IUserRepository, ProfileQuery } from "../interface";
import { ErrorUserNotFound } from "../model/error";
import {  User } from "../model/user";

export class ProfileUserQueryHandler implements IQueryHandler<ProfileQuery, User> {
  constructor(private readonly repository: IUserRepository) {}

  async query(query: ProfileQuery): Promise<User> {
    const user = await this.repository.get(query.id);

    if (!user) {
      throw ErrorUserNotFound; 
    }

    return user;
  }
}