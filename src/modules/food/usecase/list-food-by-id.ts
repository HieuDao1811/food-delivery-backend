import { IQueryHandler } from "../../../shared/interface";
import { ErrorFoodNotFound } from "../../cart/model/error";
import { IFoodRepository, ListByIdQuery } from "../interface";
import { Food } from "../model/model";

export class ListFoodByIdQueryHandler implements IQueryHandler<ListByIdQuery, Food> {
  constructor(private readonly repository: IFoodRepository) {}
  async query(query: ListByIdQuery): Promise<Food> {
    const food = await this.repository.get(query.id);
    if (!food) {
      throw ErrorFoodNotFound;
    }
    
    return food;
  }
}