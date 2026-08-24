import z from "zod";

export const addCartItemDTOSchema = z.object({
  foodId: z.string(),
  quantity: z.coerce.number().int().positive()
})

export type addCartItemDTO = z.infer<typeof addCartItemDTOSchema>;

export const CartItemCondDTOSchema = z.object({
  cartId: z.uuid(),
  foodId: z.uuid()
})

export type CartItemCondDTO = z.infer<typeof CartItemCondDTOSchema>;

export const InsertCartItemDTOSchema = z.object({
  cartId: z.string(),
  foodId: z.string(),
  quantity: z.number()
})

export type InsertCartItemDTO = z.infer<typeof InsertCartItemDTOSchema>;