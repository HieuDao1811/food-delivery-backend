import { v7 } from 'uuid';
import { foodErrors } from '../model/error';
import { CreateFoodSchema } from '../model/dto';
import type { CreateCommand, IFoodRepository } from '../interface';
import type { ICommandHandler } from '../../../shared/interface';

export class CreateNewFoodCmdHandler implements ICommandHandler<CreateCommand, string> {
  constructor(private readonly repository: IFoodRepository) {}

  async execute(command: CreateCommand): Promise<string> {
    const { success, data: parsedData, error } = CreateFoodSchema.safeParse(command.cmd);


    if(!success) {
      throw foodErrors.invalidData(error.flatten());
    }

    const isExist = await this.repository.findByCond({ name: parsedData.name });
    if(isExist) {
      throw foodErrors.nameDuplicated();
    }

    const newId = v7();
    const food = {
      ...parsedData,
      id: newId,
      isAvailable: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await this.repository.insert(food);
    return newId;
  }
}
