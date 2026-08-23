import z from "zod";

export const CartSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Cart = z.infer<typeof CartSchema>;