import { v7 } from "uuid";
import bcrypt from "bcrypt";
import { ICommandHandler, Role } from "../../../shared/interface";
import { UserRepository } from "../infras/repository";
import { RegisterUserCommand } from "../interface";
import { RegisterUserSchema } from "../model/dto";
import { ErrorInvalidRegistrationData, ErrorUserIsExisted } from "../model/error";
import { Gender, UserStatus } from "../model/model";

export class RegisterUserCmdHandler implements ICommandHandler<RegisterUserCommand, string> {
  constructor(private readonly repository: UserRepository) {}
  
  async execute(command: RegisterUserCommand): Promise<string> {
    const { success, data, error } = RegisterUserSchema.safeParse(command.cmd);

    if(!success) {
      throw ErrorInvalidRegistrationData;
    }
    
    const existedUser = await this.repository.findByCond({ email: data.email });

    if(existedUser) {
      throw ErrorUserIsExisted;
    }

    const newId = v7();

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password, salt);

    const user = {
      ...data,
      id: newId,
      password: hashedPassword,
      salt: salt,
      gender: Gender.UNKNOWN,
      status: UserStatus.ACTIVE,
      role: Role.CUSTOMER,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await this.repository.insert(user);

    return newId;
  }
}
