import { ICommandHandler } from "../../../shared/interface";
import { ErrDataNotFound } from "../../../shared/model/base-error";
import { IFoodRepository, UpdateCommand } from "../interface";
import { UpdateFoodSchema } from "../model/dto";

export class UpdateFoodCmdHandler implements ICommandHandler<UpdateCommand, boolean> {
  constructor(private readonly repository: IFoodRepository) {}

  async execute(command: UpdateCommand): Promise<boolean> {
    const { success, data, error } = UpdateFoodSchema.safeParse(command.cmd);

    if(!success) {
      throw new Error("Invalid data");
    }

    const food = await this.repository.get(command.id);

    if(!food || food.isAvailable === 0) {
      throw ErrDataNotFound;
    }

    await this.repository.update(command.id, command.cmd);

    return true;
  }
}
