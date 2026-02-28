"use client";

import { Button } from "@/components/ui/button";
import { CreatableSelect } from "@/components/ui/creatableSelect";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import {
  addAttributeService,
  addAttributeValueService,
  updateAttributeService,
  updateAttributeValueService,
} from "@/lib/data-service";
import {
  ApiResponse,
  APIStatus,
  Attribute,
  AttributeValue,
  Brand,
} from "@/lib/type";
import { changeForSelectObject } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AttributeValueFormData {
  name: string;
  description: string;
  is_active: boolean;
  attribute: { label: string; value: string } | null;
}

interface CreateAttributeValueFormProps {
  onCloseModal?: () => void;
  attributeValueToEdit?: Partial<AttributeValue>;
  attributies: Attribute[];
}

export const CreateAttributeValueForm = ({
  attributeValueToEdit = {},
  onCloseModal,
  attributies,
}: CreateAttributeValueFormProps) => {
  const [state, setState] = useState<ApiResponse>();
  const {
    id: editId,
    attributeId,
    attribute: editiableAttributeList,
    ...editData
  } = attributeValueToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AttributeValueFormData>({
    defaultValues: isEditSession
      ? {
          ...editData,
          attribute: editiableAttributeList
            ? changeForSelectObject(editiableAttributeList)
            : null,
        }
      : {},
  });

  const onSubmit = async (data: Record<string, any>) => {
    const formData = new FormData();
    console.log("Form data before processing:", data);
    for (const key in data) {
      const value = data[key];
      if (key === "attribute") {
        formData.append("attributeId", value?.value || "");
        continue;
      }
      formData.append(key, String(value));
    }

    const result = editId
      ? await updateAttributeValueService(undefined, editId, formData)
      : await addAttributeValueService(undefined, formData);

    setState(result);
  };
  useEffect(() => {
    if (state?.status === APIStatus.SUCCESS) {
      toast.success(state.message || "Attribute value saved successfully");
      onCloseModal?.();
    } else if (state?.error || state?.status === APIStatus.FAIL) {
      toast.error(state?.message || "Failed to save attribute value");
    }
  }, [state, onCloseModal]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Attribute" error={state?.error?.attributeId}>
        <Controller
          name="attribute"
          control={control}
          render={({ field }) => (
            <CreatableSelect
              {...field}
              data={attributies}
              placeholder="Select attribute..."
            />
          )}
        />
      </FormRow>
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
