"use client";

import { getChartOfAccountColumns } from "@/columns/chart-of-accounts";
import DataTable from "@/components/ui/DataTable";
import { ChartOfAccount } from "@/lib/type";

interface ChartOfAccountTableProps {
  chartOfAccounts: ChartOfAccount[];
}

export default function ChartOfAccountTable({
  chartOfAccounts,
}: ChartOfAccountTableProps) {
  const columns = getChartOfAccountColumns(chartOfAccounts);

  return <DataTable columns={columns} data={chartOfAccounts} />;
}
