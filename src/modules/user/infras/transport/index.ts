import { Request, Response } from "express";
import { RegisterUserCmdHandler } from "../../usecase/register-user";

export class UserHttpService {
  constructor(
    private readonly registerCommandHandler: RegisterUserCmdHandler
  ) {}

  async registerAPI(req: Request, res: Response) {
    const result = await this.registerCommandHandler.execute({ cmd: req.body });
    res.status(201).json({ data: result });
  }
}