import bcrypt from "bcrypt";
import { ICommandHandler } from "../../../shared/interface";
import { IUserRepository, UpdateUserCommand } from "../interface";
import { UpdateUserSchema } from "../model/dto";
import { ErrorInvalidUpdateData, ErrorUserNotFound } from "../model/error";
import { UserStatus } from "../model/user";

export class UpdateUserCmdHandler implements ICommandHandler<UpdateUserCommand, boolean> {
  constructor(private readonly repository: IUserRepository) {}

  async execute(command: UpdateUserCommand): Promise<boolean> {
    const { success, data, error } = UpdateUserSchema.safeParse(command.cmd);

    if (!success) {
      throw ErrorInvalidUpdateData;
    }

    const user = await this.repository.get(command.id);
    
    if (!user || user.status === UserStatus.DELETED) {
      throw ErrorUserNotFound;
    }

    const updateData = { ...data };

    if (data.password) {
      updateData.password = bcrypt.hashSync(data.password, 10);
    }

    await this.repository.update(command.id, updateData);
    
    return true;
  }
}