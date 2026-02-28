"use client";

import { Button } from "@/components/ui/button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import {
  addAttributeService,
  updateAttributeService,
} from "@/lib/data-service";
import { ApiResponse, APIStatus, Attribute, Brand } from "@/lib/type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CreateAttributeFormProps {
  onCloseModal?: () => void;
  attributeToEdit?: Partial<Attribute>;
}

export const CreateAttributeForm = ({
  attributeToEdit = {},
  onCloseModal,
}: CreateAttributeFormProps) => {
  const [state, setState] = useState<ApiResponse>();
  const { id: editId, ...editData } = attributeToEdit;
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

    for (const key in data) {
      const value = data[key];

      // Handle file input safely
      if (key === "image_url") {
        if (value instanceof FileList && value.length > 0) {
          formData.append("image", value[0]);
        }
        continue; // skip normal append for image_url
      }

      // Handle other fields
      formData.append(key, String(value));
    }

    const result = editId
      ? await updateAttributeService(undefined, editId, formData)
      : await addAttributeService(undefined, formData);

    setState(result);
  };
  useEffect(() => {
    if (state?.status === APIStatus.SUCCESS) {
      toast.success(state.message || "Attribute saved successfully");
      onCloseModal?.();
    } else if (state?.error || state?.status === APIStatus.FAIL) {
      toast.error(state?.message || "Failed to save attribute");
    }
  }, [state, onCloseModal]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Name" error={state?.error?.name}>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>
      <FormRow label="Description" error={state?.error?.description}>
        <Input type="text" id="description" {...register("description")} />
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
