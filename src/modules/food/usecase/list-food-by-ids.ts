import { IQueryHandler } from "../../../shared/interface";
import { IFoodRepository, ListByIdsQuery } from "../interface";
import { Food } from "../model/model";

export class ListFoodByIdsQueryHandler implements IQueryHandler<ListByIdsQuery, Array<Food>> {
  constructor(private readonly repository: IFoodRepository) {}

  async query(query: ListByIdsQuery): Promise<Array<Food>> {
    return this.repository.listByIds(query.ids);
  }
}