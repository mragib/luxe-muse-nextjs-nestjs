"use client";

import { Button } from "@/components/ui/button";
import { CreatableSelect } from "@/components/ui/creatableSelect";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { addCategoryService, updateCategoryService } from "@/lib/data-service";
import { ApiResponse, APIStatus, Category } from "@/lib/type";
import { changeForSelectObject } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CategoryFormData {
  name: string;
  description: string;
  image_url: FileList | string;
  parent: { label: string; value: string } | null;
  is_active: boolean;
  is_leaf: boolean;
}

interface CreateCategoryFormProps {
  onCloseModal?: () => void;
  categoryToEdit?: Partial<Category>;
  categories: Category[];
}

export default function CreateCategoryForm({
  categoryToEdit = {},
  onCloseModal,
  categories,
}: CreateCategoryFormProps) {
  const [state, setState] = useState<ApiResponse>();
  const {
    id: editId,
    parentId,
    parent: editiableParent,
    ...editData
  } = categoryToEdit;
  const isEditSession = Boolean(editId);

  const filteredCategories = categories?.filter((cat) => cat.id !== editId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    defaultValues: isEditSession
      ? {
          ...editData,
          parent: editiableParent
            ? changeForSelectObject(editiableParent)
            : null,
        }
      : {},
  });

  const onSubmit = async (data: Record<string, any>) => {
    const formData = new FormData();

    for (const key in data) {
      const value = data[key];

      // ✅ File upload
      if (key === "image_url") {
        if (value instanceof FileList && value.length > 0) {
          formData.append("image", value[0]);
        }
        continue;
      }

      // ✅ Parent mapping (VERY IMPORTANT FIX)
      if (key === "parent") {
        formData.append("parentId", value?.value || "");
        continue;
      }

      formData.append(key, String(value));
    }

    const result = editId
      ? await updateCategoryService(undefined, editId, formData)
      : await addCategoryService(undefined, formData);

    setState(result);
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
      <FormRow label="Description" error={state?.error?.description}>
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

      {isEditSession && categoryToEdit?.image_url && (
        <div className="mb-3">
          <p className="text-sm text-gray-500 mb-1">Current Image</p>
          <img
            src={categoryToEdit.image_url}
            alt="Category"
            className="h-20 w-20 object-cover rounded"
          />
        </div>
      )}

      <FormRow label="Parent" error={state?.error?.parentId}>
        <Controller
          name="parent"
          control={control}
          render={({ field }) => (
            <CreatableSelect
              {...field}
              data={filteredCategories}
              placeholder="Select parent category..."
            />
          )}
        />
      </FormRow>

      <FormRow label="Leaf" htmlFor="is_leaf">
        <Input type="checkbox" id="is_leaf" {...register("is_leaf")} />

        {state?.error?.is_leaf && (
          <p className="text-red-500 text-sm">{state.error.is_leaf}</p>
        )}
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
