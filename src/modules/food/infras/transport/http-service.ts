import { IFoodUseCase } from "../../interface";
import { CreateFoodSchema, FoodCondDTOSchema, UpdateFoodSchema } from "../../model/dto";
import { Request, Response } from 'express';
import { PagingSchema } from "../../../../shared/model/paging";
import { ErrDataNotFound } from "../../../../shared/model/base-error";
import { z } from "zod";

export class FoodHttpService {
  constructor(private readonly useCase: IFoodUseCase) {}

  // [POST] create
  async createANewFoodAPI(req: Request, res: Response) {
    const { success, data, error } = CreateFoodSchema.safeParse(req.body);
    
      if(!success) {
        res.status(400).json({
          message: error.message
        });
    
        return;
      }

    try {
      const result = await this.useCase.createANewFood(data);
      res.status(201).json({ data: result });
    } catch (error) { this.handleError(error, res); }
  }

  async getDetailFoodAPI(req: Request, res: Response) {
    try {
      const result = await this.useCase.getDetailFood(req.params.id as string);
      res.status(200).json({ data: result });
    } catch (error) { this.handleError(error, res); }
  }

  async listFoodsAPI(req: Request, res: Response) {
    const parsed = z.object({
      ...FoodCondDTOSchema.shape,
      ...PagingSchema.shape
    }).safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      return;
    }
    const { page, limit, name, isAvailable } = parsed.data;
    try {
      const result = await this.useCase.listFoods({ name, isAvailable }, { page, limit });
      res.status(200).json({ data: result, paging: { page, limit } });
    } catch (error) { this.handleError(error, res); }
  }

  async updateFoodAPI(req: Request, res: Response) {
    const parsed = UpdateFoodSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid food data", errors: parsed.error.issues });
      return;
    }
    try {
      await this.useCase.updateFood(req.params.id as string, parsed.data);
      res.status(200).json({ message: "Food updated successfully" });
    } catch (error) { this.handleError(error, res); }
  }

  async deleteFoodAPI(req: Request, res: Response) {
    try {
      await this.useCase.deleteFood(req.params.id as string);
      res.status(204).send();
    } catch (error) { this.handleError(error, res); }
  }

  private handleError(error: unknown, res: Response) {
    if (error === ErrDataNotFound || (error instanceof Error && error.message === ErrDataNotFound.message)) {
      res.status(404).json({ message: "Food not found" });
      return;
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }


}
