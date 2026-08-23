import { Request, Response } from "express";
import { ICommandHandler, IQueryHandler } from "../../../../shared/interface";
import { PagingSchema } from "../../../../shared/model/paging";
import { CreateCommand, DeleteCommand, GetDetailQuery, ListQuery, UpdateCommand } from "../../interface";
import { CondCategorySchema } from "../../model/dto";
import { ErrorInvalidCategoryData } from "../../model/error";
import { Category } from "../../model/model";

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
      res.status(400).json({ message: (error as Error).message });
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
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async listAPI(req: Request, res: Response) {
    try {
      const pagingResult = PagingSchema.safeParse(req.query);
      const condResult = CondCategorySchema.safeParse(req.query);

      if (!pagingResult.success || !condResult.success) {
        throw ErrorInvalidCategoryData;
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
      res.status(400).json({ message: (error as Error).message });
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
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async deleteAPI(req: Request, res: Response) {
    console.log("id:", req.params.id);
    try {
      await this.deleteCmdHandler.execute({ id: req.params.id as string });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
