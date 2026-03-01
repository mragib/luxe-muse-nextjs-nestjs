"use client";

import { getColumns } from "@/columns/product";
import DataTable from "@/components/ui/DataTable";
import { Product } from "@/lib/type";

const ProductTable = ({
  products,
  categories,
  brands,
}: {
  products: Product[];
  categories: any[];
  brands: any[];
}) => {
  const columns = getColumns(categories, brands);
  return <DataTable columns={columns} data={products} />;
};

export default ProductTable;
