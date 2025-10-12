import { AdminPageHeader } from "@/components/Header/AdminPageHeader";
import React from "react";
import { AddBrand } from "./AddBrand";
import { getBrands } from "@/lib/data-service";
import DataTable from "@/components/ui/DataTable";
import { columns } from "@/columns/brands";

const Brands = async () => {
  const { data: brands } = await getBrands();
  return (
    <div>
      <AdminPageHeader heading="Brands">
        <AddBrand />
      </AdminPageHeader>
      <DataTable columns={columns} data={brands} />
    </div>
  );
};

export default Brands;
