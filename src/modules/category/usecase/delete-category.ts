import { ICommandHandler } from "../../../shared/interface";
import { DeleteCommand, ICategoryRepository } from "../interface";
import { categoryErrors } from "../model/error";

export class DeleteCategoryCmdHandler implements ICommandHandler<DeleteCommand, boolean> {
  constructor(private readonly repository: ICategoryRepository) {}

  async execute(command: DeleteCommand): Promise<boolean> {
    const category = await this.repository.get(command.id);
    if (!category) {
      throw categoryErrors.notFound();
    }

    const child = await this.repository.findByCond({ parentId: command.id });
    if (child) {
      throw categoryErrors.hasChildren();
    }

    const deleted = await this.repository.delete(command.id);
    if (!deleted) {
      throw categoryErrors.notFound();
    }

    return true;
  }
}
