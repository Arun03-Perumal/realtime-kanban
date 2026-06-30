"use server";

import { createClient } from "@/lib/supabase/server";
import { createTaskSchema } from "@/lib/validations/task";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  const supabase = await createClient();

  const values = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    column_id: formData.get("column_id") as string,
    priority: formData.get("priority") as "low" | "medium" | "high",
  };

  const result = createTaskSchema.safeParse(values);

  if (!result.success) {
    return {
      error: result.error.issues[0].message,
    };
  }

  const { error } = await supabase.from("tasks").insert({
    title: values.title,
    description: values.description,
    column_id: values.column_id,
    priority: values.priority,
  });

  if (error) {
    console.error("TASK INSERT ERROR:", error);

    return {
      error: error.message,
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
  };
}

export async function getTasks(columnId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("column_id", columnId)
    .order("position", { ascending: true });

  if (error) {
    console.error("GET TASKS ERROR:", error);
    return [];
  }

  return data ?? [];
}