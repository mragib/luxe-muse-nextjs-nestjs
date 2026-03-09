"use client";

import { Button } from "@/components/ui/button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { addBranchService, updateBranchService } from "@/lib/data-service";
import { ApiResponse, APIStatus, branch } from "@/lib/type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CreateBranchFormProps {
  onCloseModal?: () => void;
  branchToEdit?: Partial<branch>;
}

interface BranchFormData {
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  country: { value: number; label: string };
  is_active: boolean;
}
export const CreateBranchForm = ({
  branchToEdit = {},
  onCloseModal,
}: CreateBranchFormProps) => {
  const [state, setState] = useState<ApiResponse>();
  const { id: editId, email, countryId, ...editData } = branchToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BranchFormData>({
    defaultValues: isEditSession ? { ...editData } : {},
  });

  const onSubmit = async (data: Record<string, any>) => {
    const formData = new FormData();

    for (const key in data) {
      const value = data[key];
      formData.append(key, String(value));
    }

    const result = editId
      ? await updateBranchService(undefined, editId, formData)
      : await addBranchService(undefined, formData);

    setState(result);
  };
  useEffect(() => {
    if (state?.status === APIStatus.SUCCESS) {
      toast.success(state.message || "Branch saved successfully");
      onCloseModal?.();
    } else if (state?.error || state?.status === APIStatus.FAIL) {
      toast.error(state?.message || "Failed to save branch");
    }
  }, [state, onCloseModal]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Name" error={state?.error?.name}>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>
      <FormRow label="Code" error={state?.error?.code}>
        <Input type="text" id="code" {...register("code")} />
      </FormRow>
      <FormRow label="Address" error={state?.error?.address}>
        <TextArea id="address" {...register("address")} />
      </FormRow>
      <FormRow label="Phone" error={state?.error?.phone}>
        <Input type="text" id="phone" {...register("phone")} />
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
