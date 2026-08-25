import { Sequelize } from "sequelize";
import { ICommandHandler } from "../../../shared/interface";
import { AddFoodToCartCommand, ICartCommandRepository, ICartItemCommandRepository, ICartItemQueryRepository, ICartQueryRepository, IFoodRepository } from "../interface";
import { AddCartItemDTOSchema } from "../model/dto";
import {
  ErrorCartItemQuantityExceeded,
  ErrorFoodNotFound,
  ErrorInvalidAddCartItem,
  ErrorCartItemNotFound
} from "../model/error";

export class AddFoodToCartCmdHandler implements ICommandHandler<AddFoodToCartCommand, boolean> {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly cartItemQueryRepo: ICartItemQueryRepository,
    private readonly cartItemCommandRepo: ICartItemCommandRepository,
    private readonly cartQueryRepo: ICartQueryRepository,
    private readonly cartCommandRepo: ICartCommandRepository,
    private readonly foodQueryRepo: IFoodRepository
  ) {}

  async execute(command: AddFoodToCartCommand): Promise<boolean> {
    const { success, data, error } = AddCartItemDTOSchema.safeParse(command.cmd);
    if (!success) {
      throw ErrorInvalidAddCartItem;
    }
    const { foodId, quantity } = data;

    const food = await this.foodQueryRepo.findById(foodId);
    if (!food || food.isAvailable === 0) {
      throw ErrorFoodNotFound;
    }

    return this.sequelize.transaction(async (transaction) => {
      const cart = await this.cartQueryRepo.findOrCreateByUserId(
        command.userId,
        transaction
      );

      const item = await this.cartItemQueryRepo.findByCond(
        { cartId: cart.id, foodId },
        transaction
      );

      if (item) {
        const newQuantity = item.quantity + quantity;

        if (newQuantity > 99) {
          throw ErrorCartItemQuantityExceeded;
        }

        const updated = await this.cartItemCommandRepo.updateQuantity(
          cart.id,
          foodId,
          newQuantity,
          transaction
        );

        if (!updated) {
          throw ErrorCartItemNotFound;
        }

        return true;
      }

      return this.cartItemCommandRepo.insert({
        cartId: cart.id,
        foodId,
        quantity,
        createdAt: new Date(),
        updatedAt: new Date()
      }, transaction);
    });
  }
}