"use client";

import { logout } from "@/components/user.controller";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      const response = await logout();
      if (response?.success) {
        router.push("/sign-in");
      }
    };

    handleLogout();
  }, [router]);

  return <div>Logging out...</div>;
};

export default LogOut;
