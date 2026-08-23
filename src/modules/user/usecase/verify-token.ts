import { jwtProvider } from "../../../shared/component/jwt";
import { IQueryHandler, TokenPayload } from "../../../shared/interface";
import { IUserRepository, VerifyTokenQuery } from "../interface";
import { ErrorInvalidToken, ErrorUserInactivated, ErrorUserNotFound } from "../model/error";
import { UserStatus } from "../model/model";

export class VerifyTokenQueryHandler implements IQueryHandler<VerifyTokenQuery, TokenPayload> {
  constructor(private readonly repository: IUserRepository) {}

  async query(query: VerifyTokenQuery): Promise<TokenPayload> {
    const payload = await jwtProvider.verifyToken(query.token);
    if (!payload) {
      throw ErrorInvalidToken;
    }

    const user = await this.repository.get(payload.sub);
    if (!user) {
      throw ErrorUserNotFound;
    }

    if (user.status === UserStatus.DELETED || user.status === UserStatus.INACTIVE) {
      throw ErrorUserInactivated;
    }

    return { sub: user.id, role: user.role };
  }
  
}