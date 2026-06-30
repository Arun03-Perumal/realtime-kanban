import BoardCard from "./board-card";
import { Board } from "@/types/board";

interface Props {
  boards: Board[];
}

export default function BoardGrid({ boards }: Props) {
  if (boards.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-16 text-center">
        <h2 className="text-xl font-semibold">
          No Boards Yet
        </h2>

        <p className="mt-2 text-slate-500">
          Create your first board to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
}