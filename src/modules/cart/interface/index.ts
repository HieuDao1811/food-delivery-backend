import { Cart } from "../model/cart";
import { CartFood, CartItem } from "../model/cart-item";
import { Transaction } from "sequelize";
import {
  AddCartItemDTO,
  CartItemCondDTO,
  UpdateCartItemQuantityDTO
} from "../model/dto";

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

export interface UpdateCartItemQuantityCommand {
  userId: string;
  cartId: string;
  foodId: string;
  cmd: UpdateCartItemQuantityDTO;
}

export interface ICartQueryRepository {
  findByUserId(userId: string): Promise<Cart | null>;
  findOrCreateByUserId(userId: string, transaction: Transaction): Promise<Cart>;
}

export interface ICartCommandRepository {
  insert(data: Cart, transaction?: Transaction): Promise<boolean>;
}

export interface ICartItemCommandRepository {
  insert(item: CartItem, transaction?: Transaction): Promise<boolean>;
  updateQuantity(cartId: string, foodId: string, quantity: number, transaction?: Transaction): Promise<boolean>;
  removeItemFromCart(cartId: string, foodId: string): Promise<boolean>;
}

export interface ICartItemQueryRepository {
  findByCond(cond: CartItemCondDTO, transaction?: Transaction): Promise<CartItem | null>;
  listByCartId(cartId: string): Promise<CartItem[]>;
}

export interface IFoodRepository {
  findById(id: string): Promise<CartFood | null>;
  findByIds(ids: string[]): Promise<CartFood[]>;
}

export interface ICartItemRepository extends ICartItemQueryRepository, ICartItemCommandRepository {}

export interface ICartRepository extends ICartQueryRepository, ICartCommandRepository {}