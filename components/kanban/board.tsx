import KanbanColumn from "./column";
import { Column } from "@/types/column";

interface Props {
  columns: Column[];
}

export default function KanbanBoard({ columns }: Props) {
  return (
    <div className="flex gap-6 overflow-x-auto">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          title={column.title}
        />
      ))}
    </div>
  );
}