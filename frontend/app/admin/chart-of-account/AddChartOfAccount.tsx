"use client";

import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { ChartOfAccount } from "@/lib/type";
import CreateChartOfAccountForm from "./CreateChartOfAccountForm";

export default function AddChartOfAccount({
  prevdata,
}: {
  prevdata: ChartOfAccount[];
}) {
  return (
    <Modal>
      <Modal.Open opens="form">
        <Button>Add a Chart of Account</Button>
      </Modal.Open>
      <Modal.Window name="form">
        <CreateChartOfAccountForm chartOfAccounts={prevdata} />
      </Modal.Window>
    </Modal>
  );
}
