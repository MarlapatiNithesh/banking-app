import AuthForm from "@/components/AuthForm";
import { loggedInUser } from "@/components/user.controller";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const user = await loggedInUser();

  if (user?.userId) {
    redirect("/");
    return;
  }

  return (
    <main className="flex items-center size-full justify-center overflow-hidden min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 px-4 max-sm:px-6">
      <AuthForm type="sign-up" />
    </main>
  );
}




