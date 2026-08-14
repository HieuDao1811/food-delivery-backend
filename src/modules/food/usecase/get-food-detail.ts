import { IQueryHandler, IQueryRepository } from '../../../shared/interface';
import { GetDetailQuery } from '../interface';
import { FoodCondDTO } from '../model/dto';
import { foodErrors } from '../model/error';
import { Food } from '../model/model';

export class GetFoodDetailCmdHandler implements IQueryHandler<GetDetailQuery, Food> {
  constructor(private readonly repository: IQueryRepository<Food, FoodCondDTO>) {}

  async query(query: GetDetailQuery): Promise<Food> {
    const food = await this.repository.get(query.id);

    if(!food || food.isAvailable === 0) {
      throw foodErrors.notFound();
    }

    return food;
  }
}
