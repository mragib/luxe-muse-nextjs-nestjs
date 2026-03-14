import { transactionColumns } from "@/columns/transactions";
import { AdminPageHeader } from "@/components/Header/AdminPageHeader";
import DataTable from "@/components/ui/DataTable";
import { getTransactions } from "@/lib/data-service";

const TransactionPage = async () => {
  const { data: transactions } = await getTransactions();
  return (
    <div>
      <AdminPageHeader heading="Transactions">
        <></>
      </AdminPageHeader>
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionPage;
