"use client";

import { Button } from "@/components/ui/button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { addBrandService, updateBrandService } from "@/lib/data-service";
import { ApiResponse, APIStatus, Brand } from "@/lib/type";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CreateBrandFormProps {
  onCloseModal?: () => void;
  brandToEdit?: Partial<Brand>;
}

export const CreateBrandForm = ({
  brandToEdit = {},
  onCloseModal,
}: CreateBrandFormProps) => {
  const [state, setState] = useState<ApiResponse>();
  const { id: editId, ...editData } = brandToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: isEditSession ? { ...editData } : {},
  });

  const onSubmit = async (data: Record<string, any>) => {
    const formData = new FormData();
    if (editId) {
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image_url" && value && value.length > 0) {
          // For file inputs, append the actual File object
          formData.append("image", value[0]);
        } else {
          // For other fields, convert to string
          formData.append(key, String(value));
        }
      });

      const result = await updateBrandService(undefined, editId, formData);
      setState(result);
    } else {
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image_url" && value && value.length > 0) {
          // For file inputs, append the actual File object
          formData.append("image", value[0]);
        } else {
          // For other fields, convert to string
          formData.append(key, String(value));
        }
      });

      const result = await addBrandService(undefined, formData);
      setState(result);
    }
  };

  useEffect(() => {
    if (state?.status === APIStatus.SUCCESS) {
      toast.success(state.message || "Brand saved successfully");
      onCloseModal?.();
    } else if (state?.error || state?.status === APIStatus.FAIL) {
      toast.error(state?.message || "Failed to save brand");
    }
  }, [state, onCloseModal]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Name" error={state?.error?.name}>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>
      <FormRow label="Description" error={state?.error?.descrption}>
        <Input type="text" id="description" {...register("description")} />
      </FormRow>
      <FormRow label="Brand Image" error={state?.error?.image_url}>
        <Input
          type="file"
          accept="image/*"
          id="image_url"
          {...register("image_url")}
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
