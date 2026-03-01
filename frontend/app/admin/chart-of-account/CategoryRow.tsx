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
import { Category } from "@/lib/type";
import { deleteCategoryService } from "@/lib/data-service";
import CreateCategoryForm from "./CreateChartOfAccountForm";

export default function CategoryRow({
  category,
  categories,
}: {
  category: Category;
  categories?: Category[];
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
        <CreateCategoryForm categoryToEdit={category} categories={categories} />
      </Modal.Window>

      <Modal.Window name="delete-data">
        <ConfirmDelete
          resource="category"
          onConfirm={() => {
            deleteCategoryService(category.id);
          }}
          disabled={false}
        />
      </Modal.Window>
    </Modal>
  );
}
