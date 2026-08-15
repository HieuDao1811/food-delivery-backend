import { Request, Response } from "express";
import { ICommandHandler, IQueryHandler } from "../../../../shared/interface";
import { PagingSchema } from "../../../../shared/model/paging";
import { CreateCommand, DeleteCommand, GetDetailQuery, ListQuery, UpdateCommand } from "../../interface";
import { CondCategorySchema } from "../../model/dto";
import { CategoryError, categoryErrors } from "../../model/error";
import { Category } from "../../model/model";

const sendError = (res: Response, error: unknown) => {
  if (error instanceof CategoryError) {
    return res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        ...(error.details !== undefined && { details: error.details })
      }
    });
  }

  console.error(error);
  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error"
    }
  });
};

export class CategoryHttpService {
  constructor(
    private readonly createCmdHandler: ICommandHandler<CreateCommand, string>,
    private readonly getDetailQueryHandler: IQueryHandler<GetDetailQuery, Category>,
    private readonly listQueryHandler: IQueryHandler<ListQuery, Array<Category>>,
    private readonly updateCmdHandler: ICommandHandler<UpdateCommand, boolean>,
    private readonly deleteCmdHandler: ICommandHandler<DeleteCommand, boolean>
  ) {}

  async createAPI(req: Request, res: Response) {
    try {
      const result = await this.createCmdHandler.execute({ cmd: req.body });
      res.status(201).json({
        data: result
      })
    } catch (error) {
      sendError(res, error);
    }
  }

  async getAPI(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const category = await this.getDetailQueryHandler.query({ id });
      res.status(200).json({
        data: category
      })
    } catch (error) {
      sendError(res, error);
    }
  }

  async listAPI(req: Request, res: Response) {
    try {
      const pagingResult = PagingSchema.safeParse(req.query);
      const condResult = CondCategorySchema.safeParse(req.query);

      if (!pagingResult.success || !condResult.success) {
        throw categoryErrors.invalidData({
          paging: pagingResult.success ? undefined : pagingResult.error.flatten(),
          filter: condResult.success ? undefined : condResult.error.flatten()
        });
      }

      const paging = pagingResult.data;
      const cond = condResult.data;
      const collection = await this.listQueryHandler.query({ cond, paging });

      res.status(200).json({
        data: collection,
        paging,
        filter: cond
      })
    } catch (error) {
      sendError(res, error);
    }
  }

  async updateAPI(req: Request, res: Response) {
    try {
      await this.updateCmdHandler.execute({
        id: req.params.id as string,
        cmd: req.body
      });
      res.status(200).json({ data: true });
    } catch (error) {
      sendError(res, error);
    }
  }

  async deleteAPI(req: Request, res: Response) {
    try {
      await this.deleteCmdHandler.execute({ id: req.params.id as string });
      res.status(204).send();
    } catch (error) {
      sendError(res, error);
    }
  }
}
