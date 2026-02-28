import { Button } from "@/components/ui/button";
import ButtonIcon from "@/components/ui/ButtonIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/ui/Modal";
import { HiEllipsisHorizontal, HiPencil, HiTrash } from "react-icons/hi2";
import { CreateAttributeForm } from "./CreateAttributeForm";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import { Attribute } from "@/lib/type";
import { deleteAttributeService } from "@/lib/data-service";

export default function AttributeRow({ attribute }: { attribute: Attribute }) {
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
            <Modal.Open opens="edit-attribute">
              <ButtonIcon icon={HiPencil} variant="ghost">
                Edit
              </ButtonIcon>
            </Modal.Open>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Modal.Open opens="delete-attribute">
              <ButtonIcon icon={HiTrash} variant="ghost">
                Delete
              </ButtonIcon>
            </Modal.Open>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal.Window name="edit-attribute">
        <CreateAttributeForm attributeToEdit={attribute} />
      </Modal.Window>

      <Modal.Window name="delete-attribute">
        <ConfirmDelete
          resource="attribute"
          onConfirm={() => {
            deleteAttributeService(attribute.id);
          }}
          disabled={false}
          onCloseModal={undefined}
        />
      </Modal.Window>
    </Modal>
  );
}
