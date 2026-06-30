"use server";

import { createClient } from "@/lib/supabase/server";
import { createBoardSchema } from "@/lib/validations/board";

export async function createBoard(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const values = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
  };

  const result = createBoardSchema.safeParse(values);

  if (!result.success) {
    return {
      error: result.error.issues[0].message,
    };
  }

  // Create Board
  const { data: board, error: boardError } = await supabase
    .from("boards")
    .insert({
      title: values.title,
      description: values.description,
      owner_id: user.id,
    })
    .select()
    .single();

  if (boardError) {
    console.error("BOARD INSERT ERROR:", boardError);

    return {
      error: boardError.message,
    };
  }

  console.log("Board Created:", board);

  // Create Default Columns
  const { data: columns, error: columnError } = await supabase
    .from("columns")
    .insert([
      {
        board_id: board.id,
        title: "To Do",
        position: 1,
      },
      {
        board_id: board.id,
        title: "In Progress",
        position: 2,
      },
      {
        board_id: board.id,
        title: "Done",
        position: 3,
      },
    ])
    .select();

  if (columnError) {
    console.error("COLUMN INSERT ERROR:", columnError);

    return {
      error: columnError.message,
    };
  }

  console.log("Columns Created:", columns);

  return {
    success: true,
    boardId: board.id,
  };
}

export async function getBoards() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("GET BOARDS ERROR:", error);
    return [];
  }

  return data;
}