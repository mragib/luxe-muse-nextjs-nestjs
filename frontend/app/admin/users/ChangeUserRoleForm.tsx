import { Button } from "@/components/ui/button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { userRoleChangeService } from "@/lib/data-service";
import { AdminUser, ApiResponse, APIStatus, Role } from "@/lib/type";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

interface CreateUserFormProps {
  onCloseModal?: () => void;
  userToEdit: AdminUser;
}

const roleData = [
  { label: "Admin", value: Role.ADMIN },
  { label: "Manager", value: Role.MANAGER },
  { label: "Customer", value: Role.CUSTOMER },
];

export const ChangeUserRoleForm = ({
  userToEdit,
  onCloseModal,
}: CreateUserFormProps) => {
  const [state, setState] = useState<ApiResponse>();
  const { id: editId, ...editData } = userToEdit;
  const isEditSession = Boolean(editId);
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: isEditSession
      ? { ...editData, role: roleData.find((r) => r.value === editData.role) }
      : {},
  });

  useEffect(() => {
    if (state?.status === APIStatus.SUCCESS) {
      toast.success(state.message || "User created successfully");
      onCloseModal?.();
    } else if (state?.error || state?.status === APIStatus.FAIL) {
      toast.error(state?.message || "Failed to create user");
    }
  }, [state, onCloseModal]);

  const onSubmit = async (data: Record<string, any>) => {
    const flattenedData = { ...data };
    if (data.role) {
      flattenedData.role = data.role.value; // or whatever property you need
    }

    const formData = new FormData();

    Object.entries(flattenedData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const result = await userRoleChangeService(undefined, editId, formData);
    setState(result);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
};
