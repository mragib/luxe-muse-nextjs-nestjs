import { Button } from "@/components/ui/button";
import ButtonIcon from "@/components/ui/ButtonIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/ui/Modal";

import ConfirmDelete from "@/components/ui/ConfirmDelete";
import { deleteProductService } from "@/lib/data-service";
import { Brand, Category, Product } from "@/lib/type";
import { HiEllipsisHorizontal, HiPencil, HiTrash } from "react-icons/hi2";
import CreateProductForm from "./CreateProductForm";

export default function ProductRow({
  product,
  categories,
  brands,
}: {
  product: Product;
  categories: Category[];
  brands: Brand[];
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
        <CreateProductForm
          productToEdit={product}
          categories={categories}
          brands={brands}
        />
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
