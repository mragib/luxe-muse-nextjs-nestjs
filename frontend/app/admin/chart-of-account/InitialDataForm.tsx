"use client";

import { Button } from "@/components/ui/button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { InsertInitialChartOfAccount } from "@/lib/data-service";
import { ApiResponse, APIStatus } from "@/lib/type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface InitialDataFormProps {
  onCloseModal?: () => void;
}

interface ChartOfAccountFormData {
  file: FileList;
}

export const InitialDataForm = ({ onCloseModal }: InitialDataFormProps) => {
  const [state, setState] = useState<ApiResponse>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ChartOfAccountFormData>();

  useEffect(() => {
    if (state?.status === APIStatus.SUCCESS) {
      toast.success(state.message || "Chart of account created successfully");
      onCloseModal?.();
    } else if (state?.error || state?.status === APIStatus.FAIL) {
      toast.error(state?.message || "Failed to save chart of account");
    }
  }, [state, onCloseModal]);

  const onSubmit = async (data: Record<string, any>) => {
    const formData = new FormData();

    for (const key in data) {
      const value = data[key];
      // ✅ File upload
      if (key === "file") {
        if (value instanceof FileList && value.length > 0) {
          formData.append("file", value[0]);
        }
        continue;
      }
      formData.append(key, String(value));
    }

    const result = await InsertInitialChartOfAccount(undefined, formData);

    setState(result);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="CSV File" error={state?.error?.file}>
        <Input type="file" accept=".csv" {...register("file")} />
        <Button type="submit">Upload CSV</Button>
      </FormRow>
    </Form>
  );
};
