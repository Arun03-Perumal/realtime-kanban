import { z } from "zod";

export const createBoardSchema = z.object({
  title: z
    .string()
    .min(3, "Board title must be at least 3 characters")
    .max(100),

  description: z
    .string()
    .max(500)
    .optional(),
});

export type CreateBoardInput = z.infer<typeof createBoardSchema>;