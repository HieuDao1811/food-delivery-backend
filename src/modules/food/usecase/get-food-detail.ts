import { IQueryHandler, IQueryRepository } from "../../../shared/interface";
import { ErrDataNotFound } from "../../../shared/model/base-error";
import {  GetDetailQuery, IFoodRepository } from "../interface";
import { FoodCondDTO } from "../model/dto";
import { Food } from "../model/model";

export class GetFoodDetailCmdHandler implements IQueryHandler<GetDetailQuery, Food> {
  constructor(private readonly repository: IQueryRepository<Food, FoodCondDTO>) {}

  async query(query: GetDetailQuery): Promise<Food> {
    const food = await this.repository.get(query.id);

    if(!food) {
      throw ErrDataNotFound;
    }

    return food;
  }
}