import { Request, Response } from 'express';
import { FoodPersistence } from '../repository/food.persistence';

export const listFood = async (req: Request, res: Response): Promise<void> => {
  const foods = await FoodPersistence.findAll({ order: [['id', 'DESC']]});

  res.status(200).json({
    data: foods
  });
};