import {
  LayoutDashboard,
  KanbanSquare,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-blue-600">
          TaskFlow
        </h1>
      </div>

      <nav className="space-y-2 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-slate-100">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-slate-100">
          <KanbanSquare size={20} />
          Boards
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-slate-100">
          <Settings size={20} />
          Settings
        </button>
      </nav>
    </aside>
  );
}