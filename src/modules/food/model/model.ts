import { z } from 'zod';

export enum FoodStatus  {
  AVAILABLE = 1,
  UNAVAILABLE = 0
}

export const FoodSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  imageUrl: z.string(),
  isAvailable: z.enum(FoodStatus),
  created_at: z.date(),
  updated_at: z.date()
});

export type Food = z.infer<typeof FoodSchema>;