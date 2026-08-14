import { CreateCommand, DeleteCommand, GetDetailQuery, ListQuery, UpdateCommand } from "../../interface";
import { CreateFoodSchema, FoodCondDTOSchema, UpdateFoodSchema } from "../../model/dto";
import { Request, Response } from 'express';
import { PagingSchema } from "../../../../shared/model/paging";
import { ICommandHandler, IQueryHandler } from "../../../../shared/interface";
import { Food } from "../../model/model";

export class FoodHttpService {
  constructor(
    private readonly createCmdHandler: ICommandHandler<CreateCommand, string>, 
    private readonly getFoodDetailQueryHandler: IQueryHandler<GetDetailQuery, Food>,
    private readonly listFoodQueryHandler: IQueryHandler<ListQuery, Array<Food>>,
    private readonly updateFoodCmdHandler: ICommandHandler<UpdateCommand, boolean>,
    private readonly deleteFoodCmdHandler: ICommandHandler<DeleteCommand, boolean>
  ) {}

  // [POST] create
  async createAPI(req: Request, res: Response) {
    try {
      const cmd: CreateCommand = { cmd: req.body };
      const result = await this.createCmdHandler.execute(cmd);

      res.status(201).json({ data: result });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message
      });
    }
  }

  // [GET] get detail
  async getDetailAPI(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
      const result = await this.getFoodDetailQueryHandler.query({ id });
    
      res.status(200).json({
        data: result
      });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message
      })
    }
  }

  // [GET] list
  async listAPI(req: Request, res: Response) {
    const { success, data: paging, error } = PagingSchema.safeParse(req.query);

    if (!success) {
      res.status(400).json({
        message: 'Invalid paging',
        error: error.message
      });

      return;
    }

    const cond = FoodCondDTOSchema.parse(req.query);

    const result = await this.listFoodQueryHandler.query({ cond, paging });

    res.status(200).json({
      data: result,
      paging,
      filter: cond
    });
  }

  // [PATCH] update
  async updateAPI(req: Request, res: Response) {
    const id = req.params.id as string;

    const data = req.body;

    try {
      await this.updateFoodCmdHandler.execute({ id, cmd: data });
      res.status(200).json({
        data: true
      });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message
      })
    }
  }

  // [DELETE] delete
  async deleteAPI(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
      await this.deleteFoodCmdHandler.execute({ id });
      res.status(200).json({
        data: true
      });
    } catch (error) {
      res.status(400).json({
        message: (error as Error).message
      });
    }
  }
}
