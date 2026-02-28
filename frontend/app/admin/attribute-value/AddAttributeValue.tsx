"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { CreateAttributeValueForm } from "./CreateAttributeValueForm";
import { Attribute } from "@/lib/type";

export const AddAttributeValue = ({
  attributes,
}: {
  attributes: Attribute[];
}) => {
  return (
    <Modal>
      <Modal.Open opens="attribute-form">
        <Button>Add a Attribute Value</Button>
      </Modal.Open>
      <Modal.Window name="attribute-form">
        <CreateAttributeValueForm attributies={attributes} />
      </Modal.Window>
    </Modal>
  );
};
