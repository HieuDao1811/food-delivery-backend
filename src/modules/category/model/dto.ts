import z from "zod";

export const CreateCategorySchema = z.object({
  name: z.string(),
  parentId: z.string().optional()
})

export type CreateCategoryDTO = z.infer<typeof CreateCategorySchema>;

export const UpdateCategorySchema = z.object({
  name: z.string().optional(),
  parentId: z.string().optional()
})

export type UpdateCategoryDTO = z.infer<typeof UpdateCategorySchema>;

export const CondCategorySchema = z.object({})

export type CondCategoryDTO = z.infer<typeof CondCategorySchema>;