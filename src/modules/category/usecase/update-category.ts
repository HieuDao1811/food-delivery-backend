import { ICommandHandler } from "../../../shared/interface";
import { ICategoryRepository, UpdateCommand } from "../interface";
import { UpdateCategorySchema } from "../model/dto";
import {
  ErrorCategoryNameDuplicated,
  ErrorCategoryNotFound,
  ErrorCategoryParentNotFound,
  ErrorInvalidCategoryData,
  ErrorInvalidCategoryParent
} from "../model/error";

export class UpdateCategoryCmdHandler implements ICommandHandler<UpdateCommand, boolean> {
  constructor(private readonly repository: ICategoryRepository) {}

  async execute(command: UpdateCommand): Promise<boolean> {
    const { success, data, error } = UpdateCategorySchema.safeParse(command.cmd);

    if (!success) {
      throw ErrorInvalidCategoryData;
    }

    const category = await this.repository.get(command.id);
    if (!category) {
      throw ErrorCategoryNotFound;
    }

    if (data.name) {
      const duplicatedCategory = await this.repository.findByCond({ name: data.name });
      if (duplicatedCategory && duplicatedCategory.id !== command.id) {
        throw ErrorCategoryNameDuplicated;
      }
    }

    if (data.parentId) {
      let ancestorId: string | null = data.parentId;
      const visited = new Set<string>();

      while (ancestorId) {
        if (ancestorId === command.id || visited.has(ancestorId)) {
          throw ErrorInvalidCategoryParent;
        }

        visited.add(ancestorId);
        const ancestor = await this.repository.get(ancestorId);
        if (!ancestor) {
          throw ErrorCategoryParentNotFound;
        }

        ancestorId = ancestor.parentId;
      }
    }

    const updated = await this.repository.update(command.id, data);
    if (!updated) {
      throw ErrorCategoryNotFound;
    }

    return true;
  }
}
