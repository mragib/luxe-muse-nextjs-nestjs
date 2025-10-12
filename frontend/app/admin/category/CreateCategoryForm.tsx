"use client";

import { Button } from "@/components/ui/button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { addCategoryService } from "@/lib/data-service";
import { ApiResponse, APIStatus, Category } from "@/lib/type";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

interface CreateCategoryFormProps {
  onCloseModal?: () => void;
  categoryToEdit?: Partial<Category>;
  categories?: Category[];
}

export default function CreateCategoryForm({
  categoryToEdit = {},
  onCloseModal,
  categories,
}: CreateCategoryFormProps) {
  const [state, setState] = useState<ApiResponse>();
  const { id: editId, ...editData } = categoryToEdit;
  const isEditSession = Boolean(editId);

  const options =
    categories?.map((cat) => ({ value: cat.id, label: cat.name })) || [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: isEditSession ? { ...editData } : {},
  });

  const onSubmit = async (data: Record<string, any>) => {
    const processedData = {
      ...data,
      parentId: data.parentId?.value || "",
    };

    console.log(processedData);

    const formData = new FormData();
    if (editId) {
      Object.entries(processedData).forEach(([key, value]) => {
        if (key === "image_url" && value && value.length > 0) {
          // For file inputs, append the actual File object
          formData.append("image", value[0]);
        } else {
          // For other fields, convert to string
          formData.append(key, String(value));
        }
      });

      const result = await updateCategoryService(undefined, editId, formData);
      setState(result);
    } else {
      Object.entries(processedData).forEach(([key, value]) => {
        if (key === "image_url" && value && value.length > 0) {
          // For file inputs, append the actual File object
          formData.append("image", value[0]);
        } else {
          // For other fields, convert to string
          formData.append(key, String(value));
        }
      });

      const result = await addCategoryService(undefined, formData);
      setState(result);
    }
  };

  useEffect(() => {
    if (state?.status === APIStatus.SUCCESS) {
      toast.success(state.message || "Category saved successfully");
      onCloseModal?.();
    } else if (state?.error || state?.status === APIStatus.FAIL) {
      toast.error(state?.message || "Failed to save category");
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
      <FormRow label="Category Image" error={state?.error?.image_url}>
        <Input
          type="file"
          accept="image/*"
          id="image_url"
          {...register("image_url")}
        />
      </FormRow>

      <FormRow label="Parent" error={state?.error?.parentId}>
        <Controller
          name="parentId"
          control={control}
          render={({ field }) => (
            <Select
              options={options}
              isClearable
              placeholder="Select parent category..."
              // react-hook-form integration
              value={
                options.find((option) => option.value === field.value) || null
              }
              onChange={(selectedOption) =>
                field.onChange(selectedOption ? selectedOption.value : null)
              }
            />
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
}
