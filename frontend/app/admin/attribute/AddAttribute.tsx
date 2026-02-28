"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { CreateAttributeForm } from "./CreateAttributeForm";

export const AddAttribute = () => {
  return (
    <Modal>
      <Modal.Open opens="attribute-form">
        <Button>Add a Attribute</Button>
      </Modal.Open>
      <Modal.Window name="attribute-form">
        <CreateAttributeForm />
      </Modal.Window>
    </Modal>
  );
};
