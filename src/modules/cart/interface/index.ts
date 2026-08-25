import { Cart } from "../model/cart";
import { CartFood, CartItem } from "../model/cart-item";
import { AddCartItemDTO, CartItemCondDTO } from "../model/dto";

export interface AddFoodToCartCommand {
  userId: string;
  cmd: AddCartItemDTO;
}

export interface RemoveItemCommand {
  userId: string;
  cartId: string;
  foodId: string;
}

export interface GetMyCartQuery {
  userId: string;
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
  removeItemFromCart(cartId: string, foodId: string): Promise<boolean>;
}

export interface ICartItemQueryRepository {
  findByCond(cond: CartItemCondDTO): Promise<CartItem | null>;
  listByCartId(cartId: string): Promise<CartItem[]>;
}

export interface IFoodRepository {
  findById(id: string): Promise<CartFood | null>;
  findByIds(ids: string[]): Promise<CartFood[]>;
}

export interface ICartItemRepository extends ICartItemQueryRepository, ICartItemCommandRepository {}

export interface ICartRepository extends ICartQueryRepository, ICartCommandRepository {}