import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Board } from "@/types/board";

interface Props {
  board: Board;
}

export default function BoardCard({ board }: Props) {
  return (
    <Link href={`/board/${board.id}`}>
      <Card className="cursor-pointer transition hover:scale-[1.02] hover:shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold">
            {board.title}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {board.description || "No description"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}