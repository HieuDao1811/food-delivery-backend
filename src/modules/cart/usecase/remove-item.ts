import { ICommandHandler } from "../../../shared/interface";
import { ICartItemCommandRepository, ICartRepository, RemoveItemCommand } from "../interface";
import { ErrorCartNotFound } from "../model/error";

export class RemoveItemCmdHandler implements ICommandHandler<RemoveItemCommand, boolean> {
  constructor(
    private readonly cartRepository: ICartRepository,
    private readonly cartItemRepository: ICartItemCommandRepository) {}

  async execute(command: RemoveItemCommand): Promise<boolean> {
    const cart = await this.cartRepository.findByUserId(command.userId);
    if (!cart || cart.id !== command.cartId) {
      throw ErrorCartNotFound;
    }
    return await this.cartItemRepository.removeItemFromCart(command.cartId, command.foodId);;
  }
}