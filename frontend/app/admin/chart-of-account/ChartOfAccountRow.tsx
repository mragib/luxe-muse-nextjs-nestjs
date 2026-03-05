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
import { deleteChartOfAccountService } from "@/lib/data-service";
import { ChartOfAccount } from "@/lib/type";
import { HiEllipsisHorizontal, HiPencil, HiTrash } from "react-icons/hi2";
import CreateChartOfAccountForm from "./CreateChartOfAccountForm";

export default function ChartOfAccountRow({
  chartOfAccount,
  chartOfAccounts,
}: {
  chartOfAccount: ChartOfAccount;
  chartOfAccounts: ChartOfAccount[];
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
        <CreateChartOfAccountForm
          chartOfAccounts={chartOfAccounts}
          chartOfAccountToEdit={chartOfAccount}
        />
      </Modal.Window>

      <Modal.Window name="delete-data">
        <ConfirmDelete
          resource="Chart of Account"
          onConfirm={() => deleteChartOfAccountService(chartOfAccount.id)}
          disabled={false}
          onCloseModal={undefined}
        />
      </Modal.Window>
    </Modal>
  );
}
