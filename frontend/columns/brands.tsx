"use client";

import BrandRow from "@/app/admin/brands/BrandRow";
import { UserRow } from "@/app/admin/users/UserRow";
import { Button } from "@/components/ui/button";
import { Brand } from "@/lib/type";
import { capitalize } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Brand>[] = [
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
    id: "description",
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "image",
    accessorKey: "image_url",
    cell: ({ row }) => capitalize(row.original.image_url || ""),
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Image
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "block",
    accessorKey: "is_active",
    cell: ({ row }) => (row.original.is_active ? "✔" : "❌"),
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Active
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return <BrandRow brand={data} />;
    },
  },
];
