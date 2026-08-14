import z from "zod";

export const PagingSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  total: z.coerce.number().optional()
});
export type PagingDTO = z.infer<typeof PagingSchema>;