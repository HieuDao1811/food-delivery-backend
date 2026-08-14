import { v7 } from "uuid";
import { ICommandHandler, ICommandRepository } from "../../../shared/interface";
import { CreateCommand, IFoodRepository } from "../interface";
import { CreateFoodDTO, CreateFoodSchema } from "../model/dto";
import { ErrFoodNameDuplicate } from "../model/errors";

export class CreateNewFoodCmdHandler implements ICommandHandler<CreateCommand, string> { 
  constructor(private readonly repository: IFoodRepository) {}
  async execute(command: CreateCommand): Promise<string> {
    const { success, data: parsedData, error } = CreateFoodSchema.safeParse(command.cmd);

    if(!success) {
      throw new Error("Invalid data");
    }

    const isExist = await this.repository.get(parsedData.name);
    if(isExist) {
      throw ErrFoodNameDuplicate;
    }

    const newId = v7();

    const food = {
      ...parsedData,
      id: newId,
      isAvailable: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await this.repository.insert(food)

    return newId;
  }
}