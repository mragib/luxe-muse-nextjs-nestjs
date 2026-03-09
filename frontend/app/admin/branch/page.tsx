import { columns } from "@/columns/branch";
import { AdminPageHeader } from "@/components/Header/AdminPageHeader";
import DataTable from "@/components/ui/DataTable";
import { getBranches } from "@/lib/data-service";
import { AddBranch } from "./AddBranch";

const BranchPage = async () => {
  const { data } = await getBranches();
  return (
    <div>
      <AdminPageHeader heading="Branches">
        <AddBranch />
      </AdminPageHeader>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default BranchPage;
