"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import React from "react";
import { CreateUserForm } from "./CreateUserForm";

export const AddUser = () => {
  return (
    <Modal>
      <Modal.Open opens="user-form">
        <Button>Add a User</Button>
      </Modal.Open>
      <Modal.Window name="user-form">
        <CreateUserForm />
      </Modal.Window>
    </Modal>
  );
};
