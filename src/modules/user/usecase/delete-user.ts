import { ICommandHandler } from "../../../shared/interface";
import { DeleteUserCommand, IUserRepository } from "../interface";
import { ErrorUserNotFound } from "../model/error";
import { UserStatus } from "../model/model";

export class DeleteUserCmdHandler implements ICommandHandler<DeleteUserCommand, boolean> {
  constructor(private readonly repository: IUserRepository) {}

  async execute(command: DeleteUserCommand): Promise<boolean> {
    const user = this.repository.get(command.id);

    if (!user) {
      throw ErrorUserNotFound;
    }
    
    await this.repository.update(command.id, { status: UserStatus.DELETED });
    return true;
  }
}