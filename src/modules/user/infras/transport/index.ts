import { Request, Response } from "express";
import { RegisterUserCmdHandler } from "../../usecase/register-user";
import { CreateNewUserCmdHandler } from "../../usecase/create-new-user";

export class UserHttpService {
  constructor(
    private readonly registerCommandHandler: RegisterUserCmdHandler,
    private readonly createCommandHandler: CreateNewUserCmdHandler
  ) {}

  async registerAPI(req: Request, res: Response) {
    try {
      const result = await this.registerCommandHandler.execute({ cmd: req.body });
      res.status(201).json({ data: result });
    } catch (error) {
      res.status(400).json({ mesage: (error as Error).message })
    }
  }



  async createAPI(req: Request, res: Response) {
    try {
      const result = await this.createCommandHandler.execute({ cmd: req.body });
      res.status(201).json({ data: result });
    } catch (error) {
      res.status(400).json({ mesage: (error as Error).message })
    }
  }
}