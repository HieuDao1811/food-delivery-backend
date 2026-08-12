import z from "zod";

export const CreateFoodSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  price: z.coerce.number().positive(),
  imageUrl: z.string().optional()
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

export const PagingSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10)
});
export type PagingDTO = z.infer<typeof PagingSchema>;