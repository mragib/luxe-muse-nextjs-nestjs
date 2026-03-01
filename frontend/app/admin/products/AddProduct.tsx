"use client";

import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Brand, Category } from "@/lib/type";
import CreateProductForm from "./CreateProductForm";

export default function AddProduct({
  categories,
  brands,
}: {
  categories: Category[];
  brands: Brand[];
}) {
  return (
    <Modal>
      <Modal.Open opens="form">
        <Button>Add a Product</Button>
      </Modal.Open>
      <Modal.Window name="form">
        <CreateProductForm categories={categories} brands={brands} />
      </Modal.Window>
    </Modal>
  );
}
