import { Request, Response } from "express";
import { RegisterUserCmdHandler } from "../../usecase/register-user";
import { CreateNewUserCmdHandler } from "../../usecase/create-new-user";
import { ListUserQueryHandler } from "../../usecase/list-user";
import { ErrorInvalidQuery } from "../../model/error";
import { PagingSchema } from "../../../../shared/model/paging";
import { CondUserSchema } from "../../model/dto";
import { GetUserDetailQueryHandler } from "../../usecase/get-user-detail";
import { UpdateUserCmdHandler } from "../../usecase/update-user";
import { DeleteUserCmdHandler } from "../../usecase/delete-user";
import { LoginCommandHandler } from "../../usecase/login";
import { ProfileUserQueryHandler } from "../../usecase/profile";
import { jwtProvider } from "../../../../shared/component/jwt";

export class UserHttpService {
  constructor(
    private readonly registerCommandHandler: RegisterUserCmdHandler,
    private readonly loginCommandHandler: LoginCommandHandler,
    private readonly profileQueryHandler: ProfileUserQueryHandler,
    private readonly getDetailQueryHandler: GetUserDetailQueryHandler,
    private readonly listQueryHandler: ListUserQueryHandler,
    private readonly createCommandHandler: CreateNewUserCmdHandler,
    private readonly updateCommandHandler: UpdateUserCmdHandler,
    private readonly deleteCommandHandler: DeleteUserCmdHandler
  ) {}

  async registerAPI(req: Request, res: Response) {
    try {
      const result = await this.registerCommandHandler.execute({
        cmd: req.body,
      });
      res.status(201).json({ data: result });
    } catch (error) {
      res.status(400).json({ mesage: (error as Error).message });
    }
  }

  async loginAPI(req: Request, res: Response) {
    try {
      const result = await this.loginCommandHandler.execute({ cmd: req.body });
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ mesage: (error as Error).message });
    }
  }

  async profileAPI(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const payload = await jwtProvider.verifyToken(token);
      if (!payload) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { sub } = payload;

      const user = await this.profileQueryHandler.query({ id: sub });

      const { password, status, role, salt, ... otherProps  } = user;

      res.status(200).json({ data: otherProps });
    } catch (error) {
      res.status(400).json({ mesage: (error as Error).message });
    }
  }

  async getDetailAPI(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const result = await this.getDetailQueryHandler.query({ id });
      
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async listAPI(req: Request, res: Response) {
    try {
      const pagingResult = PagingSchema.safeParse(req.query);
      const condResult = CondUserSchema.safeParse(req.query);

      if (!pagingResult.success || !condResult.success) {
        throw ErrorInvalidQuery;
      }

      const paging = pagingResult.data;
      const cond = condResult.data;
      const collection = await this.listQueryHandler.query({ cond, paging });

      res.status(200).json({
        data: collection,
        paging,
        filter: cond,
      });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async createAPI(req: Request, res: Response) {
    try {
      const result = await this.createCommandHandler.execute({ cmd: req.body });
      res.status(201).json({ data: result });
    } catch (error) {
      res.status(400).json({ mesage: (error as Error).message });
    }
  }

  async updateAPI(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const result = await this.updateCommandHandler.execute({ id, cmd: req.body });
      res.status(200).json({ data: true });
    } catch (error) {
      res.status(400).json({ mesage: (error as Error).message });
    }
  }

  async deleteAPI(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const result = await this.deleteCommandHandler.execute({ id });
      res.status(200).json({ data: true });
    } catch (error) {
      res.status(400).json({ mesage: (error as Error).message });
    }
  }
}
