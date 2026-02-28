"use client";

import AttributeValueRow from "@/app/admin/attribute-value/AttributeValueRow";
import { Button } from "@/components/ui/button";
import { Attribute, AttributeValue, Brand } from "@/lib/type";
import { capitalize } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const getAttributeValuesColumns = (
  attributes: Attribute[],
): ColumnDef<AttributeValue>[] => [
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
          Value
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
    id: "type",
    accessorKey: "attribute",
    cell: ({ row }) => capitalize(row.original.attribute?.name || ""),
    header: ({ column }) => {
      return (
        <Button
          className="text-sm md:text-md font-bold uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "is_active",
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
      return (
        <AttributeValueRow attributeValue={data} attributies={attributes} />
      );
    },
  },
];
