import { jwtProvider } from "../../../shared/component/jwt";
import { IQueryHandler, Role, TokenPayload } from "../../../shared/interface";
import { ErrorInvalidToken } from "../../../shared/model/base-error";
import { IUserRepository, VerifyTokenQuery } from "../interface";
import { ErrorUserInactivated, ErrorUserNotFound } from "../model/error";
import { UserStatus } from "../model/model";

export class VerifyTokenQueryHandler implements IQueryHandler<VerifyTokenQuery, TokenPayload> {
  query(query: VerifyTokenQuery): Promise<TokenPayload> {
    throw new Error("Method not implemented.");
  }
  
}