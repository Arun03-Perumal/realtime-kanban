import EmptyColumn from "./empty-column";

interface Props {
  title: string;
}

export default function KanbanColumn({ title }: Props) {
  return (
    <div className="w-80 rounded-xl bg-slate-100 p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-bold">{title}</h2>

      <EmptyColumn />
    </div>
  );
}