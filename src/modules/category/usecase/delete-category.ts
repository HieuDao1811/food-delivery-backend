import { ICommandHandler } from "../../../shared/interface";
import { DeleteCommand, ICategoryRepository } from "../interface";
import { ErrorCategoryHasChildren, ErrorCategoryNotFound } from "../model/error";

export class DeleteCategoryCmdHandler implements ICommandHandler<DeleteCommand, boolean> {
  constructor(private readonly repository: ICategoryRepository) {}

  async execute(command: DeleteCommand): Promise<boolean> {
    const category = await this.repository.get(command.id);
    if (!category) {
      throw ErrorCategoryNotFound;
    }

    const child = await this.repository.findByCond({ parentId: command.id });
    if (child) {
      throw ErrorCategoryHasChildren;
    }

    const deleted = await this.repository.delete(command.id);
    if (!deleted) {
      throw ErrorCategoryNotFound;
    }

    return true;
  }
}
