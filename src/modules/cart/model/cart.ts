import z from "zod";
import { CartFood, CartItem } from "./cart-item";

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

export type CartItemDetail = CartItem & {
  food: CartFood | null;
};

export type CartDetail = Cart & {
  items: CartItemDetail[];
};