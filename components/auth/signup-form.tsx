"use client";

import { useState, useTransition } from "react";
import { signUp } from "@/app/actions/auth";

export default function SignupForm() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      const result = await signUp(formData);

      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit} className="mx-auto mt-10 w-full max-w-md space-y-5 rounded-xl border bg-white p-8 shadow">
      <div>
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="mt-2 text-sm text-gray-500">
          Sign up to continue
        </p>
      </div>

      <input
        name="name"
        type="text"
        placeholder="Full Name"
        required
        className="w-full rounded-md border p-3"
      />

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

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        required
        className="w-full rounded-md border p-3"
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-black p-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {isPending ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}