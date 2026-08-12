import { IFoodUseCase } from "../../interface";
import { CreateFoodSchema } from "../../model/dto";
import { Request, Response } from 'express';

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

    const result = await this.useCase.createANewFood(data);
    res.status(201).json({ data: result });
  }


}