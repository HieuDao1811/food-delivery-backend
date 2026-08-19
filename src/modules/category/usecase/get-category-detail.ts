import { IQueryHandler, IQueryRepository } from "../../../shared/interface";
import { GetDetailQuery } from "../interface";
import { CondCategoryDTO } from "../model/dto";
import { ErrorCategoryNotFound } from "../model/error";
import { Category } from "../model/model";

export class GetDetailQueryHandler implements IQueryHandler<GetDetailQuery, Category> {
  constructor(private readonly repository: IQueryRepository<Category, CondCategoryDTO>) {}

  async query(query: GetDetailQuery): Promise<Category> {
    const result = await this.repository.get(query.id);

    if (!result) {
      throw ErrorCategoryNotFound;
    }

    return result;
  }
}
