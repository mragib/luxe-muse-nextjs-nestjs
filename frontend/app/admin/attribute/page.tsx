import { getAttributes } from "@/lib/data-service";
import { AddAttribute } from "./AddAttribute";
import { AdminPageHeader } from "@/components/Header/AdminPageHeader";
import DataTable from "@/components/ui/DataTable";
import { columns } from "@/columns/attributes";

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
