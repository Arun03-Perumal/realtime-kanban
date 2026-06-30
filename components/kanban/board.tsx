import KanbanColumn from "./column";

export default function KanbanBoard() {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      <KanbanColumn title="To Do" />
      <KanbanColumn title="In Progress" />
      <KanbanColumn title="Done" />
    </div>
  );
}