import { v7 } from "uuid";
import { ICommandHandler } from "../../../shared/interface";
import { AddFoodToCartCommand, ICartCommandRepository, ICartItemCommandRepository, ICartItemQueryRepository, ICartQueryRepository, IFoodQueryRepository } from "../interface";
import { AddCartItemDTOSchema } from "../model/dto";
import { ErrorFoodNotFound, ErrorInvalidAddCartItem } from "../model/error";

export class AddFoodToCartCmdHandler implements ICommandHandler<AddFoodToCartCommand, boolean> {
  constructor(
    private readonly cartItemQueryRepo: ICartItemQueryRepository,
    private readonly cartItemCommandRepo: ICartItemCommandRepository,
    private readonly cartQueryRepo: ICartQueryRepository,
    private readonly cartCommandRepo: ICartCommandRepository,
    private readonly foodQueryRepo: IFoodQueryRepository
  ) {}

  async execute(command: AddFoodToCartCommand): Promise<boolean> {
    const { success, data, error } = AddCartItemDTOSchema.safeParse(command.cmd);
    if (!success) {
      throw ErrorInvalidAddCartItem;
    }
    const { foodId, quantity } = data;

    const food = await this.foodQueryRepo.findById(foodId);
    if (!food) {
      throw ErrorFoodNotFound;
    }

    let cart = await this.cartQueryRepo.findByUserId(command.userId);
    if (!cart) {
      cart = {
        id: v7(),
        userId: command.userId,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await this.cartCommandRepo.insert(cart);
    }

    const item = await this.cartItemQueryRepo.findByCond({
      cartId: cart.id,
      foodId
    });

    if (item) {
      return this.cartItemCommandRepo.updateQuantity(
        cart.id,
        foodId,
        item.quantity + quantity
      );
    }

    return this.cartItemCommandRepo.insert({
      cartId: cart.id,
      foodId,
      quantity,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}