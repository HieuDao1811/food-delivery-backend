import { Request, Response } from 'express';
import { ICommandHandler, IQueryHandler } from '../../../../shared/interface';
import { PagingSchema } from '../../../../shared/model/paging';
import { CreateCommand, DeleteCommand, GetDetailQuery, ListQuery, UpdateCommand } from '../../interface';
import { FoodCondDTOSchema } from '../../model/dto';
import { FoodError, foodErrors } from '../../model/error';
import { Food } from '../../model/model';

const sendError = (res: Response, error: unknown) => {
  if(error instanceof FoodError) {
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
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error'
    }
  });
};

export class FoodHttpService {
  constructor(
    private readonly createCmdHandler: ICommandHandler<CreateCommand, string>,
    private readonly getFoodDetailQueryHandler: IQueryHandler<GetDetailQuery, Food>,
    private readonly listFoodQueryHandler: IQueryHandler<ListQuery, Array<Food>>,
    private readonly updateFoodCmdHandler: ICommandHandler<UpdateCommand, boolean>,
    private readonly deleteFoodCmdHandler: ICommandHandler<DeleteCommand, boolean>
  ) {}

  async createAPI(req: Request, res: Response) {
    try {
      const result = await this.createCmdHandler.execute({ cmd: req.body });
      res.status(201).json({ data: result });
    } catch(error) {
      sendError(res, error);
    }
  }

  async getDetailAPI(req: Request, res: Response) {
    try {
      const result = await this.getFoodDetailQueryHandler.query({ id: req.params.id as string });
      res.status(200).json({ data: result });
    } catch(error) {
      sendError(res, error);
    }
  }

  async listAPI(req: Request, res: Response) {
    try {
      const pagingResult = PagingSchema.safeParse(req.query);
      const condResult = FoodCondDTOSchema.safeParse(req.query);

      if(!pagingResult.success || !condResult.success) {
        throw foodErrors.invalidData({
          paging: pagingResult.success ? undefined : pagingResult.error.flatten(),
          filter: condResult.success ? undefined : condResult.error.flatten()
        });
      }

      const paging = pagingResult.data;
      const cond = condResult.data;
      const result = await this.listFoodQueryHandler.query({ cond, paging });

      res.status(200).json({ data: result, paging, filter: cond });
    } catch(error) {
      sendError(res, error);
    }
  }

  async updateAPI(req: Request, res: Response) {
    try {
      await this.updateFoodCmdHandler.execute({
        id: req.params.id as string,
        cmd: req.body
      });
      res.status(200).json({ data: true });
    } catch(error) {
      sendError(res, error);
    }
  }

  async deleteAPI(req: Request, res: Response) {
    try {
      await this.deleteFoodCmdHandler.execute({ id: req.params.id as string });
      res.status(204).send();
    } catch(error) {
      sendError(res, error);
    }
  }

  async listFoodById(req: Request, res: Response) {
    
  }
}
