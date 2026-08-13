import { v7 } from "uuid";
import { IFoodUseCase, IRepository } from "../interface";
import { CreateFood, FoodCondDTO, UpdateFood } from "../model/dto";
import { Food } from "../model/model";
import { PagingDTO } from "../../../shared/model/paging";
import { ErrDataNotFound } from "../../../shared/model/base-error";

export class FoodUseCase implements IFoodUseCase {
  constructor(private readonly repository: IRepository) {}

  async getDetailFood(id: string): Promise<Food | null> {
    const data = await this.repository.get(id);
    
    if( !data || data.isAvailable == 0) {
      throw ErrDataNotFound;
    }

    return data;
  }

  async updateFood(id: string, data: UpdateFood): Promise<boolean> {
    const food = await this.repository.get(id);

    if(!food || food.isAvailable === 0) {
      throw ErrDataNotFound;
    }

    return this.repository.update(id, data);
  }

  async deleteFood(id: string): Promise<boolean> {
    const food = await this.repository.get(id);
    if (!food || food.isAvailable === 0) throw ErrDataNotFound;
    return this.repository.delete(id);
  }

  async listFoods(cond: FoodCondDTO, paging: PagingDTO): Promise<Array<Food>> {
    const data = await this.repository.list(cond, paging);

    return data;
  }

  async createANewFood(data: CreateFood): Promise<string> {
    const newId = v7();

    const food: Food = {
      id: newId,
      name: data.name,
      description: data.description ?? null,
      price: data.price,
      imageUrl: data.imageUrl ?? null,
      isAvailable: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await this.repository.insert(food);

    return newId;
  }
}
