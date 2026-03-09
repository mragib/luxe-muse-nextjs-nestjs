"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { CreateBranchForm } from "./CreateBranchForm";

export const AddBranch = () => {
  return (
    <Modal>
      <Modal.Open opens="branch-form">
        <Button>Add a Branch</Button>
      </Modal.Open>
      <Modal.Window name="branch-form">
        <CreateBranchForm />
      </Modal.Window>
    </Modal>
  );
};
