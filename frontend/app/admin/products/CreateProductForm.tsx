"use client";

import { Button } from "@/components/ui/button";
import { CreatableSelect } from "@/components/ui/creatableSelect";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { UNITNAME } from "@/lib/constants";
import { addProductService, updateProductService } from "@/lib/data-service";
import { ApiResponse, APIStatus, Brand, Category, Product } from "@/lib/type";
import { changeForSelectObject } from "@/lib/utils";
import { useEffect, useState } from "react";
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
  category: { label: string; value: string } | null;
  brand: { label: string; value: string } | null;
}

interface CreateProductFormProps {
  onCloseModal?: () => void;
  productToEdit?: Partial<Product>;
  categories: Category[];
  brands: Brand[];
}

export default function CreateProductForm({
  productToEdit = {},
  onCloseModal,
  categories,
  brands,
}: CreateProductFormProps) {
  const [state, setState] = useState<ApiResponse>();
  console.log("Product to Edit:", productToEdit);
  const {
    id: editId,
    brandId,
    categoryId,
    brand: editiableBrand,
    category: editiableCategory,
    ...editData
  } = productToEdit;
  const isEditSession = Boolean(editId);

  if (isEditSession) {
    console.log(editiableBrand);
    console.log(editiableCategory);
  }

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
            ? UNITNAME.find((unit) => unit.value === editData.unit)
            : null,
          brand: editiableBrand ? changeForSelectObject(editiableBrand) : null,
          category: editiableCategory
            ? changeForSelectObject(editiableCategory)
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

      if (key === "category") {
        formData.append("categoryId", value?.value ?? "");
        continue;
      }
      if (key === "brand") {
        formData.append("brandId", value?.value ?? "");
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
      <div className="grid md:grid-cols-2">
        <FormRow label="Category" error={state?.error?.categoryId}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <CreatableSelect
                {...field}
                data={categories}
                placeholder="Select category..."
              />
            )}
          />
        </FormRow>
        <FormRow label="Brand" error={state?.error?.brandId}>
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <CreatableSelect
                {...field}
                data={brands}
                placeholder="Select brand..."
              />
            )}
          />
        </FormRow>

        <FormRow label="Name" error={state?.error?.name}>
          <Input type="text" id="name" {...register("name")} />
        </FormRow>
        <FormRow label="Description" error={state?.error?.description}>
          <TextArea id="description" {...register("description")} />
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
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
