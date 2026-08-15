import { ICommandHandler } from "../../../shared/interface";
import { ICategoryRepository, UpdateCommand } from "../interface";
import { UpdateCategorySchema } from "../model/dto";
import { categoryErrors } from "../model/error";

export class UpdateCategoryCmdHandler implements ICommandHandler<UpdateCommand, boolean> {
  constructor(private readonly repository: ICategoryRepository) {}

  async execute(command: UpdateCommand): Promise<boolean> {
    const { success, data, error } = UpdateCategorySchema.safeParse(command.cmd);

    if (!success) {
      throw categoryErrors.invalidData(error.flatten());
    }

    const category = await this.repository.get(command.id);
    if (!category) {
      throw categoryErrors.notFound();
    }

    if (data.name) {
      const duplicatedCategory = await this.repository.findByCond({ name: data.name });
      if (duplicatedCategory && duplicatedCategory.id !== command.id) {
        throw categoryErrors.nameDuplicated();
      }
    }

    if (data.parentId) {
      let ancestorId: string | null = data.parentId;
      const visited = new Set<string>();

      while (ancestorId) {
        if (ancestorId === command.id || visited.has(ancestorId)) {
          throw categoryErrors.invalidParent();
        }

        visited.add(ancestorId);
        const ancestor = await this.repository.get(ancestorId);
        if (!ancestor) {
          throw categoryErrors.parentNotFound();
        }

        ancestorId = ancestor.parentId;
      }
    }

    const updated = await this.repository.update(command.id, data);
    if (!updated) {
      throw categoryErrors.notFound();
    }

    return true;
  }
}
