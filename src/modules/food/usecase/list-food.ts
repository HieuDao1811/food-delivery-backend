import { IQueryHandler, IQueryRepository } from "../../../shared/interface";
import { ListQuery } from "../interface";
import { FoodCondDTO } from "../model/dto";
import { Food } from "../model/model";

export class ListFoodQueryHandler implements IQueryHandler<ListQuery, Array<Food>> {
  constructor(private readonly repository: IQueryRepository<Food, FoodCondDTO>) {}

  async query(query: ListQuery): Promise<Array<Food>> {
    const collection = await this.repository.list(query.cond, query.paging);
    return collection;
  }
}