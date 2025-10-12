"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import React from "react";
import { CreateBrandForm } from "./CreateBrandForm";

export const AddBrand = () => {
  return (
    <Modal>
      <Modal.Open opens="brand-form">
        <Button>Add a Brand</Button>
      </Modal.Open>
      <Modal.Window name="brand-form">
        <CreateBrandForm />
      </Modal.Window>
    </Modal>
  );
};
