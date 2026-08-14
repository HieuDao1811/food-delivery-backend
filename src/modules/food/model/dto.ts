import z from "zod";

export const CreateFoodSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().optional(),
  price: z.coerce.number().positive(),
  imageUrl: z.string().url().optional()
}).strict();
export type CreateFoodDTO = z.infer<typeof CreateFoodSchema>;

export const UpdateFoodSchema = z.object({
  name: z.string().trim().min(1).optional(),
  description: z.string().trim().nullable().optional(),
  price: z.coerce.number().positive().optional(),
  imageUrl: z.string().url().nullable().optional(),
  isAvailable: z.boolean().optional()
}).strict().refine((data) => Object.keys(data).length > 0, "At least one field is required");
export type UpdateFoodDTO = z.infer<typeof UpdateFoodSchema>;

export const FoodCondDTOSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1).optional(),
  isAvailable: z.coerce.number().int().min(0).max(1).default(1).optional(),
});

export type FoodCondDTO = z.infer<typeof FoodCondDTOSchema>;
