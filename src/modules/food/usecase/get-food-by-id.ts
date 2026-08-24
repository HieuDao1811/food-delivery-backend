import { IQueryHandler } from "../../../shared/interface";
import { ErrorFoodNotFound } from "../../cart/model/error";
import { IFoodRepository, GetByIdQuery } from "../interface";
import { Food } from "../model/model";

export class GetFoodByIdQueryHandler implements IQueryHandler<GetByIdQuery, Food> {
  constructor(private readonly repository: IFoodRepository) {}
  async query(query: GetByIdQuery): Promise<Food> {
    const food = await this.repository.get(query.id);
    if (!food) {
      throw ErrorFoodNotFound;
    }
    
    return food;
  }
}