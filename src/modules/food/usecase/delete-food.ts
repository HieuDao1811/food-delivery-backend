import { ICommandHandler } from "../../../shared/interface";
import { ErrDataNotFound } from "../../../shared/model/base-error";
import { DeleteCommand, IFoodRepository } from "../interface";

export class DeleteFoodCmdHandler implements ICommandHandler<DeleteCommand, boolean> {
  constructor(private readonly repository: IFoodRepository) {}

  async execute(command: DeleteCommand): Promise<boolean> {
    const isUnavailable = await this.repository.findByCond({ id: command.id, isAvailable: 0 });

    if(isUnavailable) {
      throw ErrDataNotFound;
    }

    const result = await this.repository.delete(command.id);

    if(!result) {
      throw ErrDataNotFound;
    }

    return true;
  }
}