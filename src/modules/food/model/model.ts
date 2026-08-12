import { z } from 'zod';

export const FoodSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  imageUrl: z.string(),
  isAvailable: z.number().int().min(0).max(1),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Food = z.infer<typeof FoodSchema>;