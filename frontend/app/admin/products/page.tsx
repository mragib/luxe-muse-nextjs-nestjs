import { AdminPageHeader } from "@/components/Header/AdminPageHeader";
import { getProducts } from "@/lib/data-service";
import React from "react";
import AddProduct from "./AddProduct";
import DataTable from "@/components/ui/DataTable";
import { columns } from "@/columns/product";

const ProductPage = async () => {
  const { data: products } = await getProducts();
  return (
    <div>
      <AdminPageHeader heading="Products">
        <AddProduct />
      </AdminPageHeader>
      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default ProductPage;
