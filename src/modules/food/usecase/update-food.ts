import { ICommandHandler } from '../../../shared/interface';
import { IFoodRepository, UpdateCommand } from '../interface';
import { UpdateFoodSchema } from '../model/dto';
import { foodErrors } from '../model/error';

export class UpdateFoodCmdHandler implements ICommandHandler<UpdateCommand, boolean> {
  constructor(private readonly repository: IFoodRepository) {}

  async execute(command: UpdateCommand): Promise<boolean> {
    const { success, data, error } = UpdateFoodSchema.safeParse(command.cmd);

    if(!success) {
      throw foodErrors.invalidData(error.flatten());
    }

    const food = await this.repository.get(command.id);
    if(!food || food.isAvailable === 0) {
      throw foodErrors.notFound();
    }

    if(data.name) {
      const duplicatedFood = await this.repository.findByCond({ name: data.name });
      if(duplicatedFood && duplicatedFood.id !== command.id) {
        throw foodErrors.nameDuplicated();
      }
    }

    await this.repository.update(command.id, data);
    return true;
  }
}
