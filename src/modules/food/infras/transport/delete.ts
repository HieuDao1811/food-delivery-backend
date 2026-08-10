import { Request, Response } from 'express';
import { FoodPersistence } from '../repository/food.persistence';

export const deleteFood = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id as string;

  const food = await FoodPersistence.findByPk(id);

  if(!food) {
    res.status(404).json({
      message: "Food not found"
    });

    return;
  };

  if(!food.isAvailable) {
    res.status(400).json({
      message: "Food already deleted"
    })
  }

  await FoodPersistence.update({ 
      isAvailable: 0
    }, {
      where: {
        id
      }
    });

  res.status(204).send();
}