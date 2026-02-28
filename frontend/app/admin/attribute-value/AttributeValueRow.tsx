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
import { CreateAttributeValueForm } from "./CreateAttributeValueForm";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import { Attribute, AttributeValue, Brand } from "@/lib/type";
import { deleteAttributeService, deleteBrandService } from "@/lib/data-service";

export default function AttributeValueRow({
  attributeValue,
  attributies,
}: {
  attributeValue: AttributeValue;
  attributies: Attribute[];
}) {
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
            <Modal.Open opens="edit-attribute-value">
              <ButtonIcon icon={HiPencil} variant="ghost">
                Edit
              </ButtonIcon>
            </Modal.Open>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Modal.Open opens="delete-attribute-value">
              <ButtonIcon icon={HiTrash} variant="ghost">
                Delete
              </ButtonIcon>
            </Modal.Open>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal.Window name="edit-attribute-value">
        <CreateAttributeValueForm
          attributies={attributies}
          attributeValueToEdit={attributeValue}
        />
      </Modal.Window>

      <Modal.Window name="delete-attribute-value">
        <ConfirmDelete
          resource="attribute value"
          onConfirm={() => {
            deleteAttributeService(attributeValue.id);
          }}
          disabled={false}
          onCloseModal={undefined}
        />
      </Modal.Window>
    </Modal>
  );
}
