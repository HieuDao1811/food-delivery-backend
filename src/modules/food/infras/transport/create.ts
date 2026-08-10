import { Request, Response } from 'express';
import { FoodPersistence } from '../repository/food.persistence';
import { v7 } from 'uuid';
import { CreateFoodSchema } from '../../model/dto';

export const createFood = async (req: Request, res: Response): Promise<void> => {
  const { success, data, error } = CreateFoodSchema.safeParse(req.body);

  if(!success) {
    res.status(400).json({
      message: error.message
    });

    return;
  }

  const newId = v7();
  await FoodPersistence.create({id: newId, ...data});

  res.status(201).json({
    data: newId
  });
}