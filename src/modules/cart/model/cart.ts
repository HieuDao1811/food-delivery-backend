import z from "zod";

export const CartSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Cart = z.infer<typeof CartSchema>;

export const CartUserSchema = z.object({
  id: z.string(),
  name: z.string()
});

export type CartUser = z.infer<typeof CartUserSchema>;

export const CartFoodSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.coerce.number().positive(),
  imageUrl: z.string().nullable().optional()
});

export type CartFood = z.infer<typeof CartFoodSchema>;
