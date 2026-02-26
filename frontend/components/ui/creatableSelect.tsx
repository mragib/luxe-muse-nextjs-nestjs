import { safeChangeForSelectArray } from "@/lib/utils";
import AsyncSelect from "react-select/async";
import { StylesConfig } from "react-select";

interface SelectOption {
  value: string;
  label: string;
}

interface CreatableSelectProps {
  data: any[];
  error?: boolean;
  multiple?: boolean;
  value?: SelectOption | SelectOption[] | null;
  onChange?: (newValue: any, actionMeta?: any) => void;
  onBlur?: () => void;
  placeholder?: string;
  name?: string;
  refs?: any;
}

export function CreatableSelect({
  data = [],
  error = false,
  multiple = false,
  value,
  onChange,
  onBlur,
  placeholder = "Select...",
  name,
  refs,
  ...props
}: CreatableSelectProps) {
  // Use safe function to prevent NaN
  const reMappedData = safeChangeForSelectArray(data);

  const customStyles: StylesConfig<SelectOption, boolean> = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: error && !state.isFocused ? "rgb(239, 68, 68)" : "#d1d5db",
      borderRadius: "0.375rem",
      padding: "2px 4px",
      "&:hover": {
        borderColor: error ? "rgb(239, 68, 68)" : "#9ca3af",
      },
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
          ? "#eff6ff"
          : "white",
      color: state.isSelected ? "white" : "black",
    }),
  };

  function promiseOptions(
    inputValue: string,
    callback: (options: SelectOption[]) => void,
  ) {
    setTimeout(() => {
      if (!inputValue) {
        callback(reMappedData);
        return;
      }

      const filteredOptions = reMappedData.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
      callback(filteredOptions);
    }, 300);
  }

  return (
    <AsyncSelect
      {...props}
      ref={refs}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      styles={customStyles}
      defaultOptions={reMappedData}
      loadOptions={promiseOptions}
      isMulti={multiple}
      placeholder={placeholder}
      isClearable
      noOptionsMessage={({ inputValue }) =>
        inputValue ? "No options found" : "Start typing to search..."
      }
      isSearchable={true}
    />
  );
}
