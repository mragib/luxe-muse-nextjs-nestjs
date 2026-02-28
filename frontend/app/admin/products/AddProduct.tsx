"use client";

import React from "react";
import CreateCategoryForm from "./CreateProductForm";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Category, Product } from "@/lib/type";
import CreateProductForm from "./CreateProductForm";

export default function AddProduct() {
  return (
    <Modal>
      <Modal.Open opens="form">
        <Button>Add a Product</Button>
      </Modal.Open>
      <Modal.Window name="form">
        <CreateProductForm />
      </Modal.Window>
    </Modal>
  );
}
