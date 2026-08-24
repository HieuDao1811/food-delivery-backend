import { Food } from "../../food/model/model";
import { CartItem } from "../model/cart-item";
import { addCartItemDTO, CartItemCondDTO, InsertCartItemDTO } from "../model/dto";

export interface ICartUseCase {
  addFoodToCart(dto: addCartItemDTO): Promise<boolean>;
}

export interface ICartQueryRepository {
  listItems(userId: string): Promise<CartItem[]>;
  findByCond(cond: CartItemCondDTO): Promise<CartItem | null>;
}

export interface ICartCommandRepository {
  insert(data: InsertCartItemDTO): Promise<boolean>;
}

export interface IFoodQueryRepository {
  findById(id: string): Promise<Food | null>;
  findByIds(ids: string[]): Promise<Food[]>;
}