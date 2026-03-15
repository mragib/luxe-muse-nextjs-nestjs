"use client";

import { Button } from "@/components/ui/button";
import { FinancialAccount } from "@/lib/type";
import { capitalize, formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const bankAccountColumns: ColumnDef<FinancialAccount>[] = [
  {
    header: "#",
    accessorKey: "index",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "name",
    accessorKey: "name",
    cell: ({ row }) => capitalize(row.original.name || ""),
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "code",
    accessorKey: "code",
    cell: ({ row }) => row.original.code,
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "account_number",
    accessorKey: "account_number",
    cell: ({ row }) => row.original.account_number || "N/A",
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Account Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "balance",
    accessorKey: "balance",
    cell: ({ row }) => formatCurrency(row.original.balance),
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Balance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
