import { bankAccountColumns } from "@/columns/bank-accounts.column";
import { AdminPageHeader } from "@/components/Header/AdminPageHeader";
import DataTable from "@/components/ui/DataTable";
import { getFinancialAccounts } from "@/lib/data-service";
import AddBankAccount from "./AddBankAccount";

export const metadata = {
  title: "Bank Accounts",
};

const BankAccountPage = async () => {
  const { data: bankAccounts } = await getFinancialAccounts();

  return (
    <div>
      <AdminPageHeader heading="Bank Accounts">
        <AddBankAccount />
      </AdminPageHeader>
      <DataTable columns={bankAccountColumns} data={bankAccounts} />
    </div>
  );
};

export default BankAccountPage;
