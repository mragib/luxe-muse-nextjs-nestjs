"use client";

import { Button } from "@/components/ui/button";
import { CreatableSelect } from "@/components/ui/creatableSelect";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { UNITNAME } from "@/lib/constants";
import {
  addCategoryService,
  addProductService,
  updateCategoryService,
  updateProductService,
} from "@/lib/data-service";
import { ApiResponse, APIStatus, Category, Product } from "@/lib/type";
import { changeForSelectObject } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

interface ProductFormData {
  name: string;
  description: string;
  image_url: FileList | string;
  unit: { label: string; value: string } | null;
  sellingUnitPrice: number;
  costUnitPrice: number;
  wholesaleUnitPrice: number;
  is_active: boolean;
}

interface CreateProductFormProps {
  onCloseModal?: () => void;
  productToEdit?: Partial<Product>;
}

export default function CreateProductForm({
  productToEdit = {},
  onCloseModal,
}: CreateProductFormProps) {
  const [state, setState] = useState<ApiResponse>();
  const { id: editId, ...editData } = productToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    defaultValues: isEditSession
      ? {
          ...editData,
          unit: editData.unit
            ? changeForSelectObject({
                label: editData.unit,
                value: editData.unit,
              })
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

      if (key === "unit") {
        formData.append("unit", value?.value ?? "");
        continue;
      }

      formData.append(key, String(value));
    }

    const result = editId
      ? await updateProductService(undefined, editId, formData)
      : await addProductService(undefined, formData);

    setState(result);
  };

  useEffect(() => {
    if (state?.status === APIStatus.SUCCESS) {
      toast.success(state.message || "Product saved successfully");
      onCloseModal?.();
    } else if (state?.error || state?.status === APIStatus.FAIL) {
      toast.error(state?.message || "Failed to save product");
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
      <FormRow label="Product Image" error={state?.error?.image_url}>
        <Input
          type="file"
          accept="image/*"
          id="image_url"
          {...register("image_url")}
        />
      </FormRow>

      {isEditSession && productToEdit?.image_url && (
        <div className="mb-3">
          <p className="text-sm text-gray-500 mb-1">Current Image</p>
          <img
            src={productToEdit.image_url}
            alt="Product Image"
            className="h-20 w-20 object-cover rounded"
          />
        </div>
      )}

      <FormRow label="Unit" error={state?.error?.unit}>
        <Controller
          name="unit"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={UNITNAME}
              placeholder="Select unit..."
            />
          )}
        />
      </FormRow>

      <FormRow
        label="Selling Unit Price"
        error={state?.error?.sellingUnitPrice}
      >
        <Input
          type="number"
          id="sellingUnitPrice"
          {...register("sellingUnitPrice")}
        />
      </FormRow>

      <FormRow label="Cost Unit Price" error={state?.error?.costUnitPrice}>
        <Input
          type="number"
          id="costUnitPrice"
          {...register("costUnitPrice")}
        />
      </FormRow>

      <FormRow
        label="Wholesale Unit Price"
        error={state?.error?.wholesaleUnitPrice}
      >
        <Input
          type="number"
          id="wholesaleUnitPrice"
          {...register("wholesaleUnitPrice")}
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
