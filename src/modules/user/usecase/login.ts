import brcypt from "bcrypt";

import { ICommandHandler } from "../../../shared/interface";
import { IUserRepository, LoginCommand } from "../interface";
import { LoginUserSchema } from "../model/dto";
import { ErrorInvalidEmailOrPassword, ErrorInvalidLoginData, ErrorUserInactivated } from "../model/error";
import { UserStatus } from "../model/model";

export class LoginCommandHandler implements ICommandHandler<LoginCommand, string> {
  constructor(private readonly repository: IUserRepository) {}
  async execute(command: LoginCommand): Promise<string> {
    const { success, data, error } = LoginUserSchema.safeParse(command.cmd);

    if (!success) {
      throw ErrorInvalidLoginData;
    }

    const user = await this.repository.findByCond({ email: data.email });

    if (!user) {
      throw ErrorInvalidEmailOrPassword;
    }

    const isValid = brcypt.compareSync(data.password, user.password);

    if (!isValid) {
      throw ErrorInvalidEmailOrPassword;
    }

    if (user.status === UserStatus.DELETED || user.status === UserStatus.INACTIVE) {
      throw ErrorUserInactivated;
    }

    return "";
  }

}