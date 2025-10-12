"use client";

import { Button } from "@/components/ui/button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { addUserService, updateUserService } from "@/lib/data-service";
import { APIStatus, Role, ApiResponse, AdminUser } from "@/lib/type";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

interface CreateUserFormProps {
  onCloseModal?: () => void;
  userToEdit?: Partial<AdminUser>;
}

const roleData = [
  { label: "Admin", value: Role.ADMIN },
  { label: "Manager", value: Role.MANAGER },
  { label: "Customer", value: Role.CUSTOMER },
];

export const CreateUserForm = ({
  userToEdit = {},
  onCloseModal,
}: CreateUserFormProps) => {
  const [state, setState] = useState<ApiResponse>();
  const { id: editId, ...editData } = userToEdit;
  const isEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: isEditSession
      ? { ...editData, role: roleData.find((r) => r.value === editData.role) }
      : {},
  });

  const onSubmit = async (data: Record<string, any>) => {
    const flattenedData = { ...data };
    if (data.role) {
      flattenedData.role = data.role.value; // or whatever property you need
    }

    const formData = new FormData();
    if (editId) {
      Object.entries(flattenedData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      const result = await updateUserService(undefined, editId, formData);
      setState(result);
    } else {
      Object.entries(flattenedData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      const result = await addUserService(undefined, formData);
      setState(result);
    }
  };

  useEffect(() => {
    if (state?.status === APIStatus.SUCCESS) {
      toast.success(state.message || "User created successfully");
      onCloseModal?.();
    } else if (state?.error || state?.status === APIStatus.FAIL) {
      toast.error(state?.message || "Failed to create user");
    }
  }, [state, onCloseModal]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Name" error={state?.error?.name}>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>
      <FormRow label="Email" error={state?.error?.email}>
        <Input type="text" id="email" {...register("email")} />
      </FormRow>
      <FormRow label="Password" error={state?.error?.password}>
        <Input type="password" id="password" {...register("password")} />
      </FormRow>
      <FormRow label="Address" error={state?.error?.address}>
        <textarea id="address" {...register("address")} />
      </FormRow>
      <FormRow label="Phone" error={state?.error?.phone}>
        <Input type="text" id="phone" {...register("phone")} />
      </FormRow>
      <FormRow label="Role" htmlFor="role">
        <Controller
          name="role"
          control={control}
          rules={{ required: "This is required" }}
          render={({ field: { ref, ...field } }) => (
            <Select {...field} options={roleData} refs={ref} multiple={false} />
          )}
        />
      </FormRow>
      <FormRow label="Active" htmlFor="active">
        <Input type="checkbox" id="active" {...register("is_active")} />

        {state?.error?.is_active && (
          <p className="text-red-500 text-sm">{state.error.is_active}</p>
        )}
      </FormRow>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
};
