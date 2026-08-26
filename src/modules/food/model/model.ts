import { z } from 'zod';

export const FoodCategorySchema = z.object({
  id: z.string(),
  name: z.string()
})

export type FoodCategory = z.infer<typeof FoodCategorySchema>;

export const FoodSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  price: z.coerce.number().positive(),
  imageUrl: z.string().nullable().optional(),
  isAvailable: z.coerce.number().int().min(0).max(1).default(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Food = z.infer<typeof FoodSchema>;