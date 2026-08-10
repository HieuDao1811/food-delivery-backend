import { Request, Response } from 'express';
import { FoodPersistence } from '../repository/food.persistence';

export const getFood = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;

  const food = await FoodPersistence.findByPk(id);

  if(!food) {
    res.status(404).json({
      message: "Food not found"
    })
    
    return;
  } else if(!food.isAvailable) {
    res.status(404).json({
      message: "Food not found"
    })

    return;
  };

  res.status(200).json({
    data: food
  });
}