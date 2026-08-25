import bcrypt from "bcrypt";

import { ICommandHandler } from "../../../shared/interface";
import { IUserRepository, UpdateAccountCmd } from "../interface";
import { UpdateAccountSchema } from "../model/dto";
import { ErrorInvalidUpdateData, ErrorUserNotFound } from "../model/error";

export class UpdateAccountCmdHandler implements ICommandHandler<UpdateAccountCmd, boolean> {
  constructor(private readonly repository: IUserRepository) {}

  async execute(command: UpdateAccountCmd): Promise<boolean> {
    const { success, data } = UpdateAccountSchema.safeParse(command.cmd);
    if (!success) {
      throw ErrorInvalidUpdateData;
    }

    const user = await this.repository.get(command.id);
    if (!user) {
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