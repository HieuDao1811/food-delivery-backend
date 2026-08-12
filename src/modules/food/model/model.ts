import { z } from 'zod';

export const FoodSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  imageUrl: z.string(),
  isAvailable: z.number().int().min(0).max(1),
  created_at: z.date(),
  updated_at: z.date()
});

export type Food = z.infer<typeof FoodSchema>;