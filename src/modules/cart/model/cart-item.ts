import z from "zod";

export const CartItemSchema = z.object({
  cartId: z.string(),
  foodId: z.string(),
  quantity: z.number().int().min(1).max(99),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type CartItem = z.infer<typeof CartItemSchema>;

export const CartFoodSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.coerce.number().positive(),
  imageUrl: z.string().nullable().optional(),
  isAvailable: z.coerce.number().int().min(0).max(1)
});

export type CartFood = z.infer<typeof CartFoodSchema>;