"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { InitialDataForm } from "./InitialDataForm";

export const AddData = () => {
  return (
    <Modal>
      <Modal.Open opens="form">
        <Button>Add All Chart of Accounts</Button>
      </Modal.Open>
      <Modal.Window name="form">
        <InitialDataForm />
      </Modal.Window>
    </Modal>
  );
};
