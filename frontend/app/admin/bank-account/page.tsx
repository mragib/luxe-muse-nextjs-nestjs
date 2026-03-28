import { bankAccountColumns } from "@/columns/bank-accounts.column";
import { AdminPageHeader } from "@/components/Header/AdminPageHeader";
import DataTable from "@/components/ui/DataTable";
import { FinancialTransactionType } from "@/lib/constants";
import { getFinancialAccounts } from "@/lib/data-service";
import AddBankAccount from "./AddBankAccount";
import TransferMoney from "./TransferMoney";

export const metadata = {
  title: "Bank Accounts",
};

const BankAccountPage = async () => {
  const { data: bankAccounts } = await getFinancialAccounts();

  return (
    <div>
      <AdminPageHeader heading="Bank Accounts">
        <TransferMoney
          accounts={bankAccounts}
          activity={FinancialTransactionType.TRANSFER}
        />
        <TransferMoney
          accounts={bankAccounts}
          activity={FinancialTransactionType.DEPOSIT}
        />
        <TransferMoney
          accounts={bankAccounts}
          activity={FinancialTransactionType.WITHDRAW}
        />
        <AddBankAccount />
      </AdminPageHeader>
      <DataTable columns={bankAccountColumns} data={bankAccounts} />
    </div>
  );
};

export default BankAccountPage;
