"use client";

import { Button } from "@/components/ui/button";
import { CreatableSelect } from "@/components/ui/creatableSelect";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { AccountTypeForSelect } from "@/lib/constants";
import {
  addChartOfAccountService,
  updateChartOfAccountService,
} from "@/lib/data-service";
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
  is_leaf: boolean;
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
  const filteredChartofAccount = chartOfAccounts?.filter(
    (cat) => cat.id !== editId,
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ChartOfAccountFormData>({
    defaultValues: isEditSession
      ? {
          ...editData,
          gl_type: editData.gl_type
            ? AccountTypeForSelect.find((opt) => opt.value === editData.gl_type)
            : null,
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

      // ✅ Parent mapping (VERY IMPORTANT FIX)
      if (key === "parent") {
        formData.append("parentId", value?.value || "");
        continue;
      }

      formData.append(key, String(value));
    }

    const result = editId
      ? await updateChartOfAccountService(undefined, editId, formData)
      : await addChartOfAccountService(undefined, formData);

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
      <FormRow label="Parent" error={state?.error?.parentId}>
        <Controller
          name="parent"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <CreatableSelect
              {...field}
              data={filteredChartofAccount}
              refs={ref}
              multiple={false}
            />
          )}
        />
      </FormRow>

      <FormRow label="Debit" error={state?.error?.dr_amount}>
        <Input type="number" step=".01" id="id" {...register("dr_amount")} />
      </FormRow>
      <FormRow label="Credit" error={state?.error?.cr_amount}>
        <Input
          type="number"
          step=".01"
          id="cr_amount"
          {...register("cr_amount")}
        />
      </FormRow>

      <FormRow label="Leaf" htmlFor="is_leaf">
        <Input type="checkbox" id="is_leaf" {...register("is_leaf")} />

        {state?.error?.is_leaf && (
          <p className="text-red-500 text-sm">{state.error.is_leaf}</p>
        )}
      </FormRow>
      <FormRow label="Active" htmlFor="is_active">
        <Input type="checkbox" id="is_active" {...register("is_active")} />

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
