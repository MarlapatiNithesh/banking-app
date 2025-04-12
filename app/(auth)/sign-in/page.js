import AuthForm from "@/components/AuthForm";
import { loggedInUser } from "@/components/user.controller";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const user = await loggedInUser();

  if (user?.userId) {
    redirect("/");
  }

  return (
    <main className="flex size-full items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 px-4">
      <AuthForm type="sign-in" />
    </main>
  );
}
