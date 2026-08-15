import z from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  parentId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type Category = z.infer<typeof CategorySchema> & { children?: Category[] };