import brcypt from "bcrypt";

import { ICommandHandler, Role } from "../../../shared/interface";
import { IUserRepository, LoginCommand } from "../interface";
import { LoginUserSchema } from "../model/dto";
import { ErrorInvalidEmailOrPassword, ErrorInvalidLoginData, ErrorUserInactivated } from "../model/error";
import { UserStatus } from "../model/model";
import { jwtProvider } from "../../../shared/component/jwt";

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

    // Check password
    const isValid = brcypt.compareSync(data.password, user.password);

    if (!isValid) {
      throw ErrorInvalidEmailOrPassword;
    }

    if (user.status === UserStatus.DELETED || user.status === UserStatus.INACTIVE) {
      throw ErrorUserInactivated;
    }

    // Return token
    const role = user.role === Role.ADMIN ? Role.ADMIN : Role.CUSTOMER;
    const token = jwtProvider.generateToken({ sub: user.id, role });

    return token;
  }

}