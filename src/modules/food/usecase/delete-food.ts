import { ICommandHandler } from '../../../shared/interface';
import { DeleteCommand, IFoodRepository } from '../interface';
import { foodErrors } from '../model/error';

export class DeleteFoodCmdHandler implements ICommandHandler<DeleteCommand, boolean> {
  constructor(private readonly repository: IFoodRepository) {}

  async execute(command: DeleteCommand): Promise<boolean> {
    const food = await this.repository.get(command.id);

    if(!food || food.isAvailable === 0) {
      throw foodErrors.notFound();
    }

    const result = await this.repository.delete(command.id);
    if(!result) {
      throw foodErrors.notFound();
    }

    return true;
  }
}
