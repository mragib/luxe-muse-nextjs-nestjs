"use client";

import { Button } from "@/components/ui/button";
import { CreatableSelect } from "@/components/ui/creatableSelect";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { AccountTypeForSelect } from "@/lib/constants";
import { addCategoryService, updateCategoryService } from "@/lib/data-service";
import { ApiResponse, APIStatus, ChartOfAccount } from "@/lib/type";
import { changeForSelectObject } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

interface ChartOfAccountFormData {
  code: number;
  name: string;
  description: string;
  image_url: FileList | string;
  parent: { label: string; value: string } | null;
  is_active: boolean;
  gl_type: { label: string; value: string } | null;
  dr_amount: number;
  cr_amount: number;
}

interface CreateChartOfAccountFormProps {
  onCloseModal?: () => void;
  chartOfAccountToEdit?: Partial<ChartOfAccount>;
  chartOfAccounts: ChartOfAccount[];
}

export default function CreateChartOfAccountForm({
  chartOfAccountToEdit = {},
  onCloseModal,
  chartOfAccounts,
}: CreateChartOfAccountFormProps) {
  const [state, setState] = useState<ApiResponse>();
  const {
    id: editId,
    parentId,
    parent: editiableParent,
    ...editData
  } = chartOfAccountToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ChartOfAccountFormData>({
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
      <FormRow label="Code" error={state?.error?.code}>
        <Input type="number" id="code" {...register("code")} />
      </FormRow>
      <FormRow label="Ledger Name" error={state?.error?.name}>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>
      <FormRow label="Type" error={state?.error?.gl_type}>
        <Controller
          name="gl_type"
          control={control}
          rules={{ required: { value: true, message: "This is required" } }}
          render={({ field: { ref, ...field } }) => {
            return <Select {...field} options={AccountTypeForSelect} />;
          }}
        />
      </FormRow>
      <FormRow label="Parent" error={errors?.parent?.message}>
        <Controller
          name="parent"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <CreatableSelect
              {...field}
              data={filteredChartofAccounting}
              refs={ref}
              multiple={false}
            />
          )}
        />
      </FormRow>
      <FormRow label="Leaf" error={errors?.status?.message}>
        {/* <Input type="checkbox" id="status" disabled={isWorking} /> */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Input
              type="checkbox"
              id="status"
              {...field}
              checked={field.value}
            />
          )}
        />
      </FormRow>
      <FormRow label="Debit" error={errors?.dr_amount?.message}>
        <Input type="number" step=".01" id="id" {...register("dr_amount")} />
      </FormRow>
      <FormRow label="Credit" error={errors?.cr_amount?.message}>
        <Input
          type="number"
          step=".01"
          id="cr_amount"
          {...register("cr_amount")}
        />
      </FormRow>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
