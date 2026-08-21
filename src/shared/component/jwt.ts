import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import { ITokenProvider, TokenPayload } from "../interface";
import { config } from "../component/config";

class JwtTokenService implements ITokenProvider {
  private readonly secretKey: string;
  private readonly expiresIn: StringValue;
  
  constructor(secretKey: string, expiresIn: StringValue) {
    this.secretKey = secretKey;
    this.expiresIn = expiresIn;
  }

  async generateToken(payload: TokenPayload): Promise<string> {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }
  async verifyToken(token: string): Promise<TokenPayload | null> {
    const decoded = jwt.verify(token, this.secretKey) as TokenPayload;
    return decoded;
  }
  
}
export const jwtProvider = new JwtTokenService(config.accessToken.secretKey, config.accessToken.expiresIn as StringValue);