import { columns } from "@/columns/attributes";
import { AdminPageHeader } from "@/components/Header/AdminPageHeader";
import DataTable from "@/components/ui/DataTable";
import { getAttributes } from "@/lib/data-service";
import { AddAttribute } from "./AddAttribute";

export const metadata = {
  title: "Attributes",
};

const AttributePage = async () => {
  const { data } = await getAttributes();
  return (
    <div>
      <AdminPageHeader heading="Attributes">
        <AddAttribute />
      </AdminPageHeader>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default AttributePage;
