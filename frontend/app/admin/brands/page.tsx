import { columns } from "@/columns/brands";
import { AdminPageHeader } from "@/components/Header/AdminPageHeader";
import DataTable from "@/components/ui/DataTable";
import { getBrands } from "@/lib/data-service";
import { AddBrand } from "./AddBrand";

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
