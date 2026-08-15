import { v7 } from "uuid";
import { ICommandHandler } from "../../../shared/interface";
import { CreateCommand, ICategoryRepository } from "../interface";
import { CreateCategorySchema } from "../model/dto";
import { categoryErrors } from "../model/error";

export class CreateNewCategoryCmdHandler implements ICommandHandler<CreateCommand, string> {
  constructor(private readonly repository: ICategoryRepository) {}

  async execute(command: CreateCommand): Promise<string> {
    const { success, data: parsedData, error } = CreateCategorySchema.safeParse(command.cmd);

    if (!success) {
      throw categoryErrors.invalidData(error.flatten());
    }

    const isExist = await this.repository.findByCond({ name: parsedData.name });
    if (isExist) {
      throw categoryErrors.nameDuplicated();
    }

    if (parsedData.parentId) {
      const parent = await this.repository.get(parsedData.parentId);

      if (!parent) {
        throw categoryErrors.parentNotFound();
      }
    }

    const newId = v7();

    const category = {
      ...parsedData,
      id: newId,
      parentId: parsedData.parentId ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await this.repository.insert(category);
    
    return newId;
  }
}
