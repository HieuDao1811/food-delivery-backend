import { Request, Response } from 'express';
import { UpdateFoodSchema } from '../../model/dto';
import { FoodPersistence } from '../repository/food.persistence';

export const updateFood = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;

  const { success, data, error } = UpdateFoodSchema.safeParse(req.body);

  if(!success) {
    res.status(400).json({
      message: error.message
    });

    return;
  };

  const food = await FoodPersistence.findByPk(id);

  if(!food) {
    res.status(404).json({
      message: "Food not found"
    });
    
    return;
  };

  if(!food.isAvailable) {
    res.status(400).json({
      message: "Food is unavailable"
    });

    return;
  };

  await FoodPersistence.update(data, {
    where: {
      id
    }
  });

  res.status(200).json({
    message: "Food updated successfully"
  });
};