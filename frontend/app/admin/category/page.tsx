import { columns } from "@/columns/categories";
import { AdminPageHeader } from "@/components/Header/AdminPageHeader";
import DataTable from "@/components/ui/DataTable";
import { getCategory } from "@/lib/data-service";
import React from "react";
import AddCategory from "./AddCategory";

export default async function page() {
  const { data: Categories } = await getCategory();

  return (
    <div>
      <AdminPageHeader heading="Categories">
        <AddCategory prevdata={Categories} />
      </AdminPageHeader>
      <DataTable columns={columns} data={Categories} />
    </div>
  );
}
