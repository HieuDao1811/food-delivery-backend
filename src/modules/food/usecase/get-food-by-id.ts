import { IQueryHandler } from "../../../shared/interface";
import { IFoodRepository, GetByIdQuery } from "../interface";
import { ErrFoodNotFound } from "../model/error";
import { Food } from "../model/model";

export class GetFoodByIdQueryHandler implements IQueryHandler<GetByIdQuery, Food> {
  constructor(private readonly repository: IFoodRepository) {}
  async query(query: GetByIdQuery): Promise<Food> {
    const food = await this.repository.get(query.id);
    if (!food) {
      throw ErrFoodNotFound;
    }
    
    return food;
  }
}