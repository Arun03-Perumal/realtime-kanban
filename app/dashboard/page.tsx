import DashboardLayout from "@/components/dashboard/dashboard-layout";
import CreateBoardDialog from "@/components/boards/create-board-dialog";
import BoardGrid from "@/components/boards/board-grid";
import { getBoards } from "@/app/actions/board";

export default async function DashboardPage() {
  const boards = await getBoards();

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Boards</h1>
          <p className="text-slate-500">
            Manage your Kanban boards
          </p>
        </div>

        <CreateBoardDialog />
      </div>

      <BoardGrid boards={boards} />
    </DashboardLayout>
  );
}