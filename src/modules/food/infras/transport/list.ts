import { Request, Response } from 'express';
import { FoodPersistence } from '../repository/food.persistence';
import { PagingSchema } from '../../../../shared/model/paging';

export const listFood = async (req: Request, res: Response): Promise<void> => {
  const { success, data, error } = PagingSchema.safeParse(req.query);

  if(!success) {
    res.status(400).json({
      message: "Invalid paging",
    });
    return;
  }

  const { page, limit } = data;

  const cond = { isAvailable: true }

  const foods = await FoodPersistence.findAll({ where: cond, limit, offset: (page-1) * limit,  order: [['id', 'DESC']]});

  res.status(200).json({
    data: foods
  });
};