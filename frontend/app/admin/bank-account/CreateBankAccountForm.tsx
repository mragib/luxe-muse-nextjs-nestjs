"use client";

import { Button } from "@/components/ui/button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { PaymentMethodTypeForSelect } from "@/lib/constants";
import { addFinancialAccountService } from "@/lib/data-service";
import { ApiResponse, APIStatus } from "@/lib/type";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";

interface BankAccountFormData {
  name: string;
  code: string;
  account_number: string;
  balance: number;
  is_active: boolean;
  type: { label: string; value: string } | null;
}

interface CreateBankAccountFormProps {
  onCloseModal?: () => void;
}

export const CreateBankAccountForm = ({
  onCloseModal,
}: CreateBankAccountFormProps) => {
  const [state, setState] = useState<ApiResponse>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BankAccountFormData>();
  const onSubmit = async (data: Record<string, any>) => {
    const formData = new FormData();
    for (const key in data) {
      const value = data[key];
      if (key === "type") {
        formData.append("type", value?.value ?? "");
        continue;
      }
      formData.append(key, String(value));
    }

    const result = await addFinancialAccountService(undefined, formData);

    setState(result);
  };
  useEffect(() => {
    if (state?.status === APIStatus.SUCCESS) {
      toast.success(state.message || "saved successfully");
      onCloseModal?.();
    } else if (state?.error || state?.status === APIStatus.FAIL) {
      toast.error(state?.message || "Failed to save");
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
      <FormRow label="Account Number" error={state?.error?.account_number}>
        <Input
          type="text"
          id="account_number"
          {...register("account_number")}
        />
      </FormRow>

      <FormRow label="Type" error={state?.error?.type}>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={PaymentMethodTypeForSelect}
              placeholder="Select Account type..."
            />
          )}
        />
      </FormRow>

      <FormRow label="Balance" error={state?.error?.balance}>
        <Input type="number" id="balance" {...register("balance")} />
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
