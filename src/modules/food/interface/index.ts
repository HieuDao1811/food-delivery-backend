import { PagingDTO } from "../../../shared/model/paging";
import { CreateFood, FoodCondDTO, UpdateFood } from "../model/dto";
import { Food } from "../model/model";

export interface IFoodUseCase {
  createANewFood(data: CreateFood): Promise<string>;
  getDetailFood(id: string): Promise<Food | null>;
  updateFood(id: string, data: UpdateFood): Promise<boolean>;
  deleteFood(id: string): Promise<boolean>;
  listFoods(cond: FoodCondDTO, paging: PagingDTO): Promise<Array<Food>>;
}

export interface IRepository extends IQueryRepository, ICommandRepository {}

export interface IQueryRepository {
  get(id: string): Promise<Food | null>;
  list(cond: FoodCondDTO, paging: PagingDTO): Promise<Array<Food>>;
}

export interface ICommandRepository {
  insert(data: Food): Promise<boolean>;
  update(id: string, data: UpdateFood): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}