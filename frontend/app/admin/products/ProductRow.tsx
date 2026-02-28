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
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import { Product } from "@/lib/type";
import { deleteProductService } from "@/lib/data-service";
import CreateProductForm from "./CreateProductForm";

export default function ProductRow({ product }: { product: Product }) {
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
            <Modal.Open opens="edit-data">
              <ButtonIcon icon={HiPencil} variant="ghost">
                Edit
              </ButtonIcon>
            </Modal.Open>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Modal.Open opens="delete-data">
              <ButtonIcon icon={HiTrash} variant="ghost">
                Delete
              </ButtonIcon>
            </Modal.Open>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal.Window name="edit-data">
        <CreateProductForm productToEdit={product} />
      </Modal.Window>

      <Modal.Window name="delete-data">
        <ConfirmDelete
          resource="product"
          onConfirm={() => {
            deleteProductService(product.id);
          }}
          disabled={false}
          onCloseModal={undefined}
        />
      </Modal.Window>
    </Modal>
  );
}
