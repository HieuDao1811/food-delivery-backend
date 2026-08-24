import z from "zod";

export const AddCartItemDTOSchema = z.object({
  foodId: z.string(),
  quantity: z.coerce.number().int().positive().default(1)
})

export type AddCartItemDTO = z.infer<typeof AddCartItemDTOSchema>;

export const CartItemCondDTOSchema = z.object({
  cartId: z.uuid(),
  foodId: z.uuid()
})

export type CartItemCondDTO = z.infer<typeof CartItemCondDTOSchema>;