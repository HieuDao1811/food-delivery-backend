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
import { VerifyTokenQueryHandler } from "../../usecase/verify-token";
import { Requester } from "../../../../shared/interface";
import { UpdateAccountCmdHandler } from "../../usecase/update-account";
import { responseErr } from "../../../../shared/app-error";

export class UserHttpService {
  constructor(
    private readonly registerCommandHandler: RegisterUserCmdHandler,
    private readonly loginCommandHandler: LoginCommandHandler,
    private readonly profileQueryHandler: ProfileUserQueryHandler,
    private readonly updateAccountCmdHandler: UpdateAccountCmdHandler,
    private readonly getDetailQueryHandler: GetUserDetailQueryHandler,
    private readonly listQueryHandler: ListUserQueryHandler,
    private readonly createCommandHandler: CreateNewUserCmdHandler,
    private readonly updateCommandHandler: UpdateUserCmdHandler,
    private readonly deleteCommandHandler: DeleteUserCmdHandler,
    private readonly verifyTokenQueryHandler: VerifyTokenQueryHandler
  ) {}

  async registerAPI(req: Request, res: Response) {
    try {
      const result = await this.registerCommandHandler.execute({
        cmd: req.body,
      });
      res.status(201).json({ data: result });
    } catch (error) {
        responseErr(error as Error, res);
    }
  }

  async loginAPI(req: Request, res: Response) {
    try {
      const result = await this.loginCommandHandler.execute({ cmd: req.body });
      res.status(200).json({ data: result });
    } catch (error) {
      responseErr(error as Error, res);
    }
  }

  async profileAPI(req: Request, res: Response) {
    try {
      const requester = res.locals.requester as Requester;

      const user = await this.profileQueryHandler.query({ id: requester.sub });

      const { password, status, role, salt, ... otherProps  } = user;

      res.status(200).json({ data: otherProps });
    } catch (error) {
        responseErr(error as Error, res);
    }
  }

  async accountAPI(req: Request, res: Response) {
    try {
      const requester = res.locals.requester as Requester;

      const user = await this.updateAccountCmdHandler.execute({ id: requester.sub, cmd: req.body });
      res.status(200).json({ data: user });
    } catch (error) {
        responseErr(error as Error, res);
    }
  }

  async getDetailAPI(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const result = await this.getDetailQueryHandler.query({ id });

      const { role, salt, password, ...otherProps } = result;

      res.status(200).json({ data: otherProps });
    } catch (error) {
        responseErr(error as Error, res);
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
        responseErr(error as Error, res);
    }
  }

  async createAPI(req: Request, res: Response) {
    try {
      const result = await this.createCommandHandler.execute({ cmd: req.body });
      res.status(201).json({ data: result });
    } catch (error) {
      responseErr(error as Error, res);
    }
  }

  async updateAPI(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const result = await this.updateCommandHandler.execute({ id, cmd: req.body });
      res.status(200).json({ data: true });
    } catch (error) {
      responseErr(error as Error, res);
    }
  }

  async deleteAPI(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const result = await this.deleteCommandHandler.execute({ id });
      res.status(200).json({ data: true });
    } catch (error) {
      responseErr(error as Error, res);
    }
  }

  async introspectAPI(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const result = await this.verifyTokenQueryHandler.query({ token });
      res.status(200).json({ data: result });
    } catch (error) {
      responseErr(error as Error, res);
    }
  }
}
