"use client";

import React from "react";
import CreateCategoryForm from "./CreateCategoryForm";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/type";

export default function AddCategory({ prevdata }: { prevdata: Category[] }) {
  return (
    <Modal>
      <Modal.Open opens="form">
        <Button>Add a Category</Button>
      </Modal.Open>
      <Modal.Window name="form">
        <CreateCategoryForm categories={prevdata} />
      </Modal.Window>
    </Modal>
  );
}
