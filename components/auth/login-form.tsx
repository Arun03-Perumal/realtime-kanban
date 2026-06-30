"use client";

import { useState, useTransition } from "react";
import { login } from "@/app/actions/auth";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      const result = await login(formData);

      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form
      action={handleSubmit}
      className="mx-auto mt-10 w-full max-w-md space-y-5 rounded-xl border bg-white p-8 shadow"
    >
      <h1 className="text-3xl font-bold">Login</h1>

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full rounded-md border p-3"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="w-full rounded-md border p-3"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-black p-3 text-white"
      >
        {isPending ? "Signing In..." : "Login"}
      </button>
    </form>
  );
}