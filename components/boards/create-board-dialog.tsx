"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBoard } from "@/app/actions/board";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CreateBoardDialog() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function action(formData: FormData) {
    setError("");

    startTransition(async () => {
      const result = await createBoard(formData);

      if (result?.error) {
        setError(result.error);
        return;
      }

      setOpen(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Board</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Board</DialogTitle>
        </DialogHeader>

        <form action={action} className="space-y-4">
          <Input
            name="title"
            placeholder="Board title"
            required
          />

          <Textarea
            name="description"
            placeholder="Board description"
          />

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <Button
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Board"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
