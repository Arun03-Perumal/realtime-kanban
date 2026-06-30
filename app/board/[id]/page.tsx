import KanbanBoard from "@/components/kanban/board";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function BoardPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Kanban Board
        </h1>

        <p className="text-slate-500">
          Board ID: {id}
        </p>
      </div>

      <KanbanBoard />
    </main>
  );
}