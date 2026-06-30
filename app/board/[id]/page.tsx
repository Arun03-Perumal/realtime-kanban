import KanbanBoard from "@/components/kanban/board";
import { getColumns, getBoards } from "@/app/actions/board";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function BoardPage({ params }: Props) {
  const { id } = await params;

  const boards = await getBoards();
  const board = boards.find((b) => b.id === id);

  if (!board) {
    notFound();
  }

  const columns = await getColumns(id);

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{board.title}</h1>

        <p className="mt-2 text-sm text-slate-500">
          Board ID: <span className="font-mono">{board.id}</span>
        </p>

        {board.description && (
          <p className="mt-2 text-slate-600">
            {board.description}
          </p>
        )}
      </div>

      <KanbanBoard columns={columns} />
    </main>
  );
}