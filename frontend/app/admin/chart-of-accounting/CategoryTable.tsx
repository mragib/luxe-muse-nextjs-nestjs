"use client";

import React from "react";
import { getCategoryColumns } from "@/columns/categories";
import DataTable from "@/components/ui/DataTable";
import { Category } from "@/lib/type";

interface CategoriesTableProps {
  categories: Category[];
}

export default function CategoriesTable({ categories }: CategoriesTableProps) {
  const columns = getCategoryColumns(categories);

  return <DataTable columns={columns} data={categories} />;
}
