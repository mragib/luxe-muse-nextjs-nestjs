import AdminLayout from "@/components/master/AdminLayout";
import { getSession } from "@/lib/session";
import { Role } from "@/lib/type";
import { redirect } from "next/navigation";
import React from "react";

async function layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/auth/signin");
  if (session.user.role === Role.CUSTOMER) redirect("/auth/signin");
  return <AdminLayout role={Role.ADMIN}>{children}</AdminLayout>;
}

export default layout;
