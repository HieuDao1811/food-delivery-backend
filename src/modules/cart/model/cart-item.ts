import z from "zod";

export const CartItemSchema = z.object({
  cartId: z.string(),
  foodId: z.string(),
  quantity: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type CartItem = z.infer<typeof CartItemSchema>;