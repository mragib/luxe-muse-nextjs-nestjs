import { columns } from "@/columns/users";
import { AdminPageHeader } from "@/components/Header/AdminPageHeader";

import DataTable from "@/components/ui/DataTable";
import { getUsers } from "@/lib/data-service";
import { AdminUser, Role } from "@/lib/type";

import React from "react";
import { AddUser } from "./AddUser";

export default async function Users() {
  const { data }: { data: AdminUser[] } = await getUsers();

  const processedUser = data.filter((user) => user.role !== Role.SUPERADMIN);

  return (
    <div>
      <AdminPageHeader heading="Users">
        <AddUser />
      </AdminPageHeader>
      <DataTable columns={columns} data={processedUser} />
    </div>
  );
}
