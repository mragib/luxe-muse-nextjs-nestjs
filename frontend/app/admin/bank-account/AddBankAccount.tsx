"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { CreateBankAccountForm } from "./CreateBankAccountForm";

const AddBankAccount = () => {
  return (
    <Modal>
      <Modal.Open opens="form">
        <Button>Add a Bank Account</Button>
      </Modal.Open>
      <Modal.Window name="form">
        <CreateBankAccountForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddBankAccount;
