"use client";

import React from "react";
import CreateCategoryForm from "./CreateChartOfAccountForm";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { ChartOfAccounting } from "@/lib/type";

export default function AddChartOfAccounting({
  prevdata,
}: {
  prevdata: ChartOfAccounting[];
}) {
  return (
    <Modal>
      <Modal.Open opens="form">
        <Button>Add a Chart of Accounting</Button>
      </Modal.Open>
      <Modal.Window name="form">
        <CreateCategoryForm categories={prevdata} />
      </Modal.Window>
    </Modal>
  );
}
