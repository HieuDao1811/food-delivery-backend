import z from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().trim().min(1),
  parentId: z.string().optional()
}).strict();

export type CreateCategoryDTO = z.infer<typeof CreateCategorySchema>;

export const UpdateCategorySchema = z.object({
  name: z.string().trim().min(1).optional(),
  parentId: z.string().nullable().optional()
}).strict().refine((data) => Object.keys(data).length > 0, "At least one field is required");

export type UpdateCategoryDTO = z.infer<typeof UpdateCategorySchema>;

export const CondCategorySchema = z.object({
  name: z.string().trim().min(1).optional(),
  parentId: z.string().optional()
});

export type CondCategoryDTO = z.infer<typeof CondCategorySchema>;
