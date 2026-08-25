import { v7 } from "uuid";
import bcrypt from "bcrypt";
import { ICommandHandler } from "../../../shared/interface";
import { CreateUserCommand, IUserRepository } from "../interface";
import { CreateUserSchema } from "../model/dto";
import { ErrorInvalidCreationData, ErrorUserIsExisted } from "../model/error";
import { User } from "../model/user";

export class CreateNewUserCmdHandler implements ICommandHandler<CreateUserCommand, string> {
  constructor(private readonly repository: IUserRepository) {}
  
  async execute(command: CreateUserCommand): Promise<string> {
    const { success, data, error } = CreateUserSchema.safeParse(command.cmd);

    if (!success) {
      throw ErrorInvalidCreationData;
    }

    const isExistedUser = await this.repository.findByCond({ email: data.email });
    if (isExistedUser) {
      throw ErrorUserIsExisted;
    }

    const newId = v7();
    const hash = bcrypt.hashSync(data.password, 10);

    const newUser: User = {
      ...data,
      id: newId,
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await this.repository.insert(newUser);

    return newId;
  }
}