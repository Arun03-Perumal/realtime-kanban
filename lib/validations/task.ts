import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Task title must be at least 3 characters")
    .max(100),

  description: z
    .string()
    .max(1000)
    .optional(),

  column_id: z.string().uuid(),

  priority: z.enum(["low", "medium", "high"]),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;