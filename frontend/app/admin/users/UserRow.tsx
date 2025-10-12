"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/ui/Modal";
import React from "react";
import { CreateUserForm } from "./CreateUserForm";
import {
  HiEllipsisHorizontal,
  HiMiniCog6Tooth,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import { AdminUser } from "@/lib/type";
import { Button } from "@/components/ui/button";
import ButtonIcon from "@/components/ui/ButtonIcon";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import { deleteUserService } from "@/lib/data-service";
import { ChangeUserRoleForm } from "./ChangeUserRoleForm";

export const UserRow = ({ user }: { user: AdminUser }) => {
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
            <Modal.Open opens="edit-user">
              <ButtonIcon icon={HiPencil} variant="ghost">
                Edit
              </ButtonIcon>
            </Modal.Open>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Modal.Open opens="edit-user-role">
              <ButtonIcon icon={HiMiniCog6Tooth} variant="ghost">
                Change Role
              </ButtonIcon>
            </Modal.Open>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Modal.Open opens="delete-user">
              <ButtonIcon icon={HiTrash} variant="ghost">
                Delete
              </ButtonIcon>
            </Modal.Open>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal.Window name="edit-user">
        <CreateUserForm userToEdit={user} />
      </Modal.Window>

      <Modal.Window name="edit-user-role">
        <ChangeUserRoleForm userToEdit={user} />
      </Modal.Window>

      <Modal.Window name="delete-user">
        <ConfirmDelete
          resource="User"
          onConfirm={() => {
            deleteUserService(user.id);
          }}
          disabled={false}
        />
      </Modal.Window>
    </Modal>
  );
};
