import { AdminPageHeader } from "@/components/Header/AdminPageHeader";
import { getChartOfAccount } from "@/lib/data-service";
import AddChartOfAccount from "./AddChartOfAccount";
import { AddData } from "./AddData";
import ChartOfAccountTable from "./ChartOfAccountTable";

const ChartOfAccount = async () => {
  const { data: chartOfAccounts } = await getChartOfAccount();
  return (
    <div>
      <AdminPageHeader heading="Chart of Accounts">
        {chartOfAccounts.length === 0 ? (
          <AddData />
        ) : (
          <AddChartOfAccount prevdata={chartOfAccounts} />
        )}
      </AdminPageHeader>
      <ChartOfAccountTable chartOfAccounts={chartOfAccounts} />
    </div>
  );
};

export default ChartOfAccount;
