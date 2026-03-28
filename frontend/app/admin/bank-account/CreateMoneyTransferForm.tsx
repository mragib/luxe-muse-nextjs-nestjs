"use client";

import { Button } from "@/components/ui/button";
import { CreatableSelect } from "@/components/ui/creatableSelect";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { FinancialTransactionType } from "@/lib/constants";
import { addFinancialAccountService } from "@/lib/data-service";
import { ApiResponse, APIStatus, FinancialAccount } from "@/lib/type";
import { changeForSelectObject } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface TransferFormData {
  fromAccount: { label: string; value: string };
  toAccount: { label: string; value: string };
  balance: number;
  transfer_date: Date;
}

interface CreateMoneyTransferFormProps {
  onCloseModal?: () => void;
  activity: FinancialTransactionType;
  accounts: FinancialAccount[];
}

const CreateMoneyTransferForm = ({
  onCloseModal,
  activity,
  accounts,
}: CreateMoneyTransferFormProps) => {
  const [state, setState] = useState<ApiResponse>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TransferFormData>();

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
      <FormRow label="From Account" error={state?.error.fromAccount}>
        <Controller
          name="fromAccount"
          control={control}
          defaultValue={
            activity === FinancialTransactionType.DEPOSIT
              ? changeForSelectObject(
                  accounts.find((item) => item.code === 1310),
                )
              : null
          }
          render={({ field }) => (
            <CreatableSelect
              {...field}
              isDisabled={activity === FinancialTransactionType.DEPOSIT}
              data={accounts}
              placeholder="Select attribute..."
            />
          )}
        />
      </FormRow>
      <FormRow label="To Account" error={state?.error.toAccount}>
        <Controller
          name="toAccount"
          control={control}
          defaultValue={
            activity === FinancialTransactionType.WITHDRAW
              ? changeForSelectObject(
                  accounts.find((item) => item.code === 1310),
                )
              : null
          }
          render={({ field }) => (
            <CreatableSelect
              {...field}
              data={accounts}
              isDisabled={activity === FinancialTransactionType.WITHDRAW}
              placeholder="Select attribute..."
            />
          )}
        />
      </FormRow>
      <FormRow label="Amount" error={state?.error.balance}>
        <Input
          type="number"
          id="amount"
          step=".01"
          disabled={isSubmitting}
          {...register("balance", {
            required: true,
          })}
        />
      </FormRow>
      <FormRow label="Transfer Date" error={state?.error.transfer_date}>
        <Input
          type="date"
          id="transfer_date"
          {...register("transfer_date", {
            required: true,
          })}
        />
      </FormRow>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
};

export default CreateMoneyTransferForm;
