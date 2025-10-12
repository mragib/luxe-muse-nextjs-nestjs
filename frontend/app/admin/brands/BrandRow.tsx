import { Button } from "@/components/ui/button";
import ButtonIcon from "@/components/ui/ButtonIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/ui/Modal";
import React from "react";
import { HiEllipsisHorizontal, HiPencil, HiTrash } from "react-icons/hi2";
import { CreateBrandForm } from "./CreateBrandForm";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import { Brand } from "@/lib/type";
import { deleteBrandService } from "@/lib/data-service";

export default function BrandRow({ brand }: { brand: Brand }) {
  return (
    <Modal>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Open menu">
            <HiEllipsisHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Modal.Open opens="edit-brand">
              <ButtonIcon icon={HiPencil} variant="ghost">
                Edit
              </ButtonIcon>
            </Modal.Open>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Modal.Open opens="delete-brand">
              <ButtonIcon icon={HiTrash} variant="ghost">
                Delete
              </ButtonIcon>
            </Modal.Open>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal.Window name="edit-brand">
        <CreateBrandForm brandToEdit={brand} />
      </Modal.Window>

      <Modal.Window name="delete-brand">
        <ConfirmDelete
          resource="brand"
          onConfirm={() => {
            deleteBrandService(brand.id);
          }}
          disabled={false}
        />
      </Modal.Window>
    </Modal>
  );
}
