import { ICommandHandler } from "../../../shared/interface";
import {
  ICartItemCommandRepository,
  ICartRepository,
  UpdateCartItemQuantityCommand
} from "../interface";
import { UpdateCartItemQuantityDTOSchema } from "../model/dto";
import {
  ErrorCartItemNotFound,
  ErrorCartNotFound,
  ErrorInvalidUpdateCartItem
} from "../model/error";

export class UpdateCartItemQuantityCmdHandler
  implements ICommandHandler<UpdateCartItemQuantityCommand, boolean>
{
  constructor(
    private readonly cartRepository: ICartRepository,
    private readonly cartItemRepository: ICartItemCommandRepository
  ) {}

  async execute(command: UpdateCartItemQuantityCommand): Promise<boolean> {
    const result = UpdateCartItemQuantityDTOSchema.safeParse(command.cmd);

    if (!result.success) {
      throw ErrorInvalidUpdateCartItem;
    }

    const cart = await this.cartRepository.findByUserId(command.userId);

    if (!cart || cart.id !== command.cartId) {
      throw ErrorCartNotFound;
    }

    const updated = await this.cartItemRepository.updateQuantity(
      command.cartId,
      command.foodId,
      result.data.quantity
    );

    if (!updated) {
      throw ErrorCartItemNotFound;
    }

    return true;
  }
}