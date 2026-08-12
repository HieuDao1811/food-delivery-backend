import z from "zod";

export const CreateFoodSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  price: z.coerce.number().positive(),
  imageUrl: z.string()
});
export type CreateFood = z.infer<typeof CreateFoodSchema>;

export const UpdateFoodSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.coerce.number().positive().optional(),
  imageUrl: z.string().optional(),
  isAvailable: z.boolean().optional()
});
export type UpdateFood = z.infer<typeof UpdateFoodSchema>;

export const FoodCondDTOSchema = z.object({
  name: z.string().optional(),
  isAvailable: z.number().int().min(0).max(1)
});

export type FoodCondDTO = z.infer<typeof FoodCondDTOSchema>;