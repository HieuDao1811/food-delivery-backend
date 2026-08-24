import { ICommandHandler } from "../../../shared/interface";
import { ICartItemCommandRepository, RemoveItemCommand } from "../interface";

export class RemoveItemCmdHandler implements ICommandHandler<RemoveItemCommand, boolean> {
  constructor(private readonly repository: ICartItemCommandRepository) {}

  async execute(command: RemoveItemCommand): Promise<boolean> {
    await this.repository.removeItemFromCart(command.cartId, command.foodId);
    return true;
  }
}