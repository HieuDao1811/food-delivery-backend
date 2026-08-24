import { Cart, CartFood } from "../model/cart";
import { CartItem } from "../model/cart-item";
import { AddCartItemDTO, CartItemCondDTO } from "../model/dto";

export interface AddFoodToCartCommand {
  userId: string;
  cmd: AddCartItemDTO;
}

export interface ICartQueryRepository {
  findByUserId(userId: string): Promise<Cart | null>;
}

export interface ICartCommandRepository {
  insert(data: Cart): Promise<boolean>;
}

export interface ICartItemCommandRepository {
  insert(item: CartItem): Promise<boolean>;
  updateQuantity(cartId: string, foodId: string, quantity: number): Promise<boolean>;
}

export interface ICartItemQueryRepository {
  findByCond(cond: CartItemCondDTO): Promise<CartItem | null>;
  listByCartId(cartId: string): Promise<CartItem[]>;
}

export interface IFoodQueryRepository {
  findById(id: string): Promise<CartFood | null>;
  findByIds(ids: string[]): Promise<CartFood[]>;
}