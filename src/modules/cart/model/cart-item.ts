import z from "zod";

export const CartItemSchema = z.object({
  cartId: z.string(),
  foodId: z.string(),
  quantity: z.number().positive(),
  createdAt: z.date(),
  updatedAt: z.date()
})