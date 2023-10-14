import { getCurrentUser } from "@/util/session";
import { redirect } from "next/navigation";
import React from "react";
import AdminLayout from "@/components/Layouts/AdminLayout";

const ManagerLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getCurrentUser();
  if (!session) {
    return redirect("/auth/signin");
  }
  return <AdminLayout session={session}>{children}</AdminLayout>;
};

export default ManagerLayout;
