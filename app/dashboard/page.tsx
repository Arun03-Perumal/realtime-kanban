import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold">
          Welcome, {user.user_metadata.full_name ?? "User"} 👋
        </h1>

        <p className="mb-2 text-gray-600">
          Email: {user.email}
        </p>

        <p className="mb-6 text-green-600 font-medium">
          Authentication is working successfully.
        </p>

        <form action={logout}>
          <button
            type="submit"
            className="w-full rounded-lg bg-red-500 px-4 py-3 font-semibold text-white hover:bg-red-600"
          >
            Logout
          </button>
        </form>
      </div>
    </main>
  );
}