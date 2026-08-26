import z from "zod";
import {
  ErrFoodAvailabilityInvalid,
  ErrFoodImageUrlInvalid,
  ErrFoodNameRequired,
  ErrFoodPricePositive,
  ErrFoodUpdateAtLeastOneField
} from "./error";

export const CreateFoodSchema = z.object({
  name: z.string().trim().min(1, ErrFoodNameRequired.message),
  description: z.string().trim().optional(),
  price: z.coerce.number().positive(ErrFoodPricePositive.message),
  imageUrl: z.string().url(ErrFoodImageUrlInvalid.message).optional(),
  categoryIds: z.array(z.string()).min(1)
}).strict();
export type CreateFoodDTO = z.infer<typeof CreateFoodSchema>;

export const UpdateFoodSchema = z.object({
  name: z.string().trim().min(1, ErrFoodNameRequired.message).optional(),
  description: z.string().trim().nullable().optional(),
  price: z.coerce.number().positive(ErrFoodPricePositive.message).optional(),
  imageUrl: z.string().url(ErrFoodImageUrlInvalid.message).nullable().optional(),
  isAvailable: z.int().min(0).max(1).optional(),
  categoryIds: z.array(z.string()).min(1).optional()
}).strict().refine((data) => Object.keys(data).length > 0, ErrFoodUpdateAtLeastOneField.message);
export type UpdateFoodDTO = z.infer<typeof UpdateFoodSchema>;

export const FoodCondDTOSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, ErrFoodNameRequired.message).optional(),
  isAvailable: z.coerce.number().int().min(0, ErrFoodAvailabilityInvalid.message).max(1, ErrFoodAvailabilityInvalid.message).default(1).optional(),
});

export type FoodCondDTO = z.infer<typeof FoodCondDTOSchema>;
